from rest_framework import serializers
from .models import UploadImage, RemovedBg

class UploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadImage
        fields = '__all__'


class RemovedBgSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemovedBg
        fields = '__all__'