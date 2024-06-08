from rest_framework import serializers
from .models import RemovedBg, Upscale, BlurBg, FilteredImage, Convert, DownScale, Animal, GrayScaleBg, Food


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

class FilteredImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilteredImage
        fields = '__all__'

class ConvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convert
        fields = '__all__'

class DownScaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownScale
        fields = '__all__'

class GrayScaleBgSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrayScaleBg
        fields = '__all__'

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'
        
class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'