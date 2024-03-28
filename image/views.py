from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import cv2
from cv2 import dnn_superres
from rembg import remove, new_session
from django.conf import settings
import uuid
import os
from django.contrib.staticfiles.storage import staticfiles_storage

from .serializers import RemovedBgSerializer, UpscaleSerializer, BlurBgSerializer, FilteredImageSerializer, ConvertSerializer
from .models import RemovedBg, Upscale, BlurBg, FilteredImage, Convert


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_bg(request):
    user = request.user
    data = request.data
    model = data['model']
    image = request.FILES['image']

    if model == 'anime':
        session = new_session('isnet-anime')
    elif model == 'general':
        session = new_session('isnet-general-use')
    else:
        session = new_session('')

    raw_image = Image.open(image)
    removedbg = remove(raw_image, session=session)

    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'removedbg', unique_filename)
    removedbg.save(processed_image_path, format='PNG')

    removedbg_instance = RemovedBg.objects.create(user=user, original=image, result=os.path.join('removedbg', unique_filename))
    serializer = RemovedBgSerializer(removedbg_instance, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_remove_bg(request,pk):
    remove_bg = RemovedBg.objects.get(id=pk)
    serializer = RemovedBgSerializer(remove_bg, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upscale_image(request):
    user = request.user
    image = request.FILES['image']
    data = request.data

    image_pil = Image.open(image)
    scaling = data['scaling']

    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'upscale', unique_filename)

    if scaling == '2':
        path = staticfiles_storage.path('models/ESPCN_x2.pb')
        if os.path.exists(path):
            sr = dnn_superres.DnnSuperResImpl_create()
            sr.readModel(path)
            sr.setModel("espcn", 2)
            raw_image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
            result = sr.upsample(raw_image)
            result_pil = Image.fromarray(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
            result_pil.save(processed_image_path, format='PNG')
        else:
            return Response({"message": "Model file not found"}, status=status.HTTP_404_NOT_FOUND)
    else:
        path = staticfiles_storage.path('models/ESPCN_x4.pb')
        if os.path.exists(path):
            sr = dnn_superres.DnnSuperResImpl_create()
            sr.readModel(path)
            sr.setModel("espcn", 4)
            raw_image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
            result = sr.upsample(raw_image)
            result_pil = Image.fromarray(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
            result_pil.save(processed_image_path, format='PNG')
        else:
            return Response({"message": "Model file not found"}, status=status.HTTP_404_NOT_FOUND)

    upscale_instance = Upscale.objects.create(user=user, original=image, result=os.path.join('upscale', unique_filename))
    serializer = UpscaleSerializer(upscale_instance, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_upscale(request,pk):
    upscale = Upscale.objects.get(id=pk)
    serializer = UpscaleSerializer(upscale, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def blur_bg(request):
    user = request.user
    data = request.data
    model = data['model']
    image = request.FILES['image']

    if model == 'anime':
        session = new_session('isnet-anime')
    elif model == 'general':
        session = new_session('isnet-general-use')
    else:
        session = new_session('')

    raw_image = Image.open(image)
    blur_image = raw_image.filter(ImageFilter.GaussianBlur(radius = 5))
    result_image = Image.new('RGBA', (raw_image.width, raw_image.height))
    removedbg = remove(raw_image, session=session)
    result_image.paste(blur_image)
    result_image.paste(removedbg, mask=removedbg)

    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'blurbg', unique_filename)
    result_image.save(processed_image_path, format='PNG')


    upscale_instance = BlurBg.objects.create(user=user, original=image, result=os.path.join('blurbg', unique_filename))
    serializer = BlurBgSerializer(upscale_instance, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_blur_bg(request,pk):
    upscale = BlurBg.objects.get(id=pk)
    serializer = BlurBgSerializer(upscale, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def filtered_image(request):
    user = request.user
    data = request.data
    filter_name = data['filter_name']
    image = request.FILES['image']

    raw_image = Image.open(image)

    if filter_name == 'grayscale':
        filter = ImageEnhance.Color(raw_image)
        result_image = filter.enhance(0)

    elif filter_name == 'color':
        filter = ImageEnhance.Color(raw_image)
        result_image = filter.enhance(2)
    elif filter_name == 'detail':
        detailed_image = raw_image.filter(ImageFilter.DETAIL)
        result_image = detailed_image.filter(ImageFilter.UnsharpMask(radius=20, percent=50, threshold=3))
    else:
        filter = ImageEnhance.Color(raw_image)
        colored = filter.enhance(1.8)
        detailed_image = colored.filter(ImageFilter.DETAIL)
        result_image = detailed_image.filter(ImageFilter.UnsharpMask(radius=20, percent=50, threshold=3))

    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'filtered', unique_filename)
    result_image.save(processed_image_path, format='PNG')


    upscale_instance = FilteredImage.objects.create(user=user, original=image, result=os.path.join('filtered', unique_filename))
    serializer = FilteredImageSerializer(upscale_instance, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_filtered_image(request,pk):
    filtered_image = FilteredImage.objects.get(id=pk)
    serializer = FilteredImageSerializer(filtered_image, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def convert(request):
    user = request.user
    data = request.data
    format = data['format']

    image = request.FILES['image']

    result_image = Image.open(image)

    unique_filename = str(uuid.uuid4()) + f'.{format}'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'converted', unique_filename)
    result_image.save(processed_image_path, format=format.upper())


    upscale_instance = Convert.objects.create(user=user, result=os.path.join('converted', unique_filename))
    serializer = ConvertSerializer(upscale_instance, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_convert(request,pk):
    convert = Convert.objects.get(id=pk)
    serializer = ConvertSerializer(convert, many=False)
    return Response(serializer.data)