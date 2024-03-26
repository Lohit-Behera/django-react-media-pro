from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ImageSerializer
from .models import Image


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    user = request.user
    image = request.FILES['image']
    
    Image.objects.create(user=user, image=image)

    return Response({'detail': 'Image uploaded successfully'})