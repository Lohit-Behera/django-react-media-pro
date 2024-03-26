from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UploadImageSerializer, RemovedBgSerializer
from .models import UploadImage, RemovedBg


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    user = request.user
    image = request.FILES['image']
    
    UploadImage.objects.create(user=user, image=image)

    return Response({'detail': 'Image uploaded successfully'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_bg(request):
    user = request.user
    image = request.FILES['image']

    removed_bg = RemovedBg.objects.create(user=user, result=image)

    serializer = RemovedBgSerializer(removed_bg, many=False)

    return Response(serializer.data)