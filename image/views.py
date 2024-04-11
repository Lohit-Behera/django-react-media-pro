from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.base import ContentFile

import torch
import torchvision.models as models
from torchvision import transforms
import torch.nn as nn
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import cv2
from cv2 import dnn_superres
from rembg import remove, new_session
from django.conf import settings
import uuid
import os

from .serializers import RemovedBgSerializer, UpscaleSerializer, BlurBgSerializer, FilteredImageSerializer, ConvertSerializer,DownScaleSerializer, GrayScaleBgSerializer, AnimalSerializer

from .models import RemovedBg, Upscale, BlurBg, FilteredImage, Convert, DownScale, Animal, GrayScaleBg


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
    data = request.data
    print(data)
    image = request.FILES['image'] 

    image_pil = Image.open(image)
    width, height = image_pil.size

    if width > 2560 or height > 1440:
        return Response({"details": "Image is too large"}, status=status.HTTP_400_BAD_REQUEST)
    
    scaling = data['scaling']
    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'upscale', unique_filename)

    if scaling == '2':
        path = os.path.join(settings.BASE_DIR, 'static/models/ESPCN_x2.pb')
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
        path =  os.path.join(settings.BASE_DIR, 'static/models/ESPCN_x4.pb')
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
    blur = data['blur']
    image = request.FILES['image']

    if model == 'anime':
        session = new_session('isnet-anime')
    elif model == 'general':
        session = new_session('isnet-general-use')
    else:
        session = new_session('')

    raw_image = Image.open(image)
    if blur == 'low':
        blur_image = raw_image.filter(ImageFilter.GaussianBlur(radius = 3))
    elif blur == 'medium':
        blur_image = raw_image.filter(ImageFilter.GaussianBlur(radius = 6))
    else:
        blur_image = raw_image.filter(ImageFilter.GaussianBlur(radius = 10))

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
        result_image = detailed_image.filter(ImageFilter.UnsharpMask(radius=25, percent=50, threshold=3))
    else:
        filter = ImageEnhance.Color(raw_image)
        colored = filter.enhance(2)
        detailed_image = colored.filter(ImageFilter.DETAIL)
        result_image = detailed_image.filter(ImageFilter.UnsharpMask(radius=25, percent=40, threshold=3))
    
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def down_scale(request):
    user = request.user
    data = request.data
    scale = data['scale']

    image = request.FILES['image']

    raw_image = Image.open(image)

    if scale == '2':
        original_width, original_height = raw_image.size

        new_width = int(original_width * 0.5)
        new_height = int(original_height * 0.5)

        result_image = raw_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    else:
        original_width, original_height = raw_image.size

        new_width = int(original_width * 0.25)
        new_height = int(original_height * 0.25)

        result_image = raw_image.resize((new_width, new_height), Image.Resampling.LANCZOS)

    unique_filename = str(uuid.uuid4()) + f'.jpeg'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'downscale', unique_filename)
    result_image.save(processed_image_path, format='JPEG')


    upscale_instance = DownScale.objects.create(user=user, result=os.path.join('downscale', unique_filename))
    serializer = DownScaleSerializer(upscale_instance, many=False)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_down_scale(request,pk):
    convert = DownScale.objects.get(id=pk)
    serializer = DownScaleSerializer(convert, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def animal(request):
    user = request.user
    try:
        if 'image' not in request.FILES:
            return Response({'detail': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
                             
        image_file = request.FILES['image']
        image = Image.open(image_file)

        class_names = ['bear', 'bee', 'butterfly', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile',
                'deer', 'dog', 'dolphin', 'eagle', 'elephant', 'fox', 'goat', 'goldfish', 'horse', 'jellyfish',
                'kangaroo', 'koala', 'lion', 'octopus', 'owl', 'panda', 'parrot', 'penguin', 'pig', 'pigeon', 'rabbit',
                'raccoon', 'rhinoceros', 'sheep', 'spider', 'squirrel', 'starfish', 'swan', 'tiger', 'whale', 'zebra']
        
        state_dict_path = os.path.join(settings.BASE_DIR, 'static/models/animal_model.pth')
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(device)
        model = models.resnet18(weights=None)
        num_classes = len(class_names)
        model.fc = nn.Linear(model.fc.in_features, num_classes)

        model.load_state_dict(torch.load(state_dict_path))
        model.eval()
        model.load_state_dict(torch.load(state_dict_path, map_location=torch.device(device)))

        preprocess = transforms.Compose([
            transforms.Resize(224),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

        input_tensor = preprocess(image)
        input_batch = input_tensor.unsqueeze(0) 
        input_batch = input_batch.to(device)
        model.to(device)

        with torch.no_grad():
            output = model(input_batch)

        _, predicted_class = output.max(1)

        predicted_label = class_names[predicted_class.item()]

        animal_instance = Animal.objects.create(user=user, original=image_file, prediction=predicted_label)
        serializer = AnimalSerializer(animal_instance, many=False)
        return Response(serializer.data)

    except:
        return Response({'detail': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def gray_scale_bg(request):
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
    filter = ImageEnhance.Color(raw_image)
    grayscale = filter.enhance(0)

    result_image = Image.new('RGBA', (raw_image.width, raw_image.height))
    removedbg = remove(raw_image, session=session)
    result_image.paste(grayscale)
    result_image.paste(removedbg, mask=removedbg)

    unique_filename = str(uuid.uuid4()) + '.png'
    processed_image_path = os.path.join(settings.MEDIA_ROOT, 'grayscale', unique_filename)
    result_image.save(processed_image_path, format='PNG')


    grayscale_instance = GrayScaleBg.objects.create(user=user, original=image, result=os.path.join('grayscale', unique_filename))
    serializer = GrayScaleBgSerializer(grayscale_instance, many=False)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gray_scale_bg(request,pk):
    grayscalebg = GrayScaleBg.objects.get(id=pk)
    serializer = GrayScaleBgSerializer(grayscalebg, many=False)
    return Response(serializer.data)