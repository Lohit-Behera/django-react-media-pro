from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'profile_image', 'join_date', 'is_staff', 'is_verified']

    def get__id(self, obj):
        return obj.id

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'profile_image', 'is_staff', 'is_verified', 'join_date','token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)