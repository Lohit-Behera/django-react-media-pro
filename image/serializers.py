from rest_framework import serializers
from .models import RemovedBg, Upscale


class RemovedBgSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemovedBg
        fields = '__all__'

class UpscaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upscale
        fields = '__all__'