from rest_framework import serializers
from .models import RemovedBg, Upscale, BlurBg


class RemovedBgSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemovedBg
        fields = '__all__'

class UpscaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upscale
        fields = '__all__'

class BlurBgSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlurBg
        fields = '__all__'