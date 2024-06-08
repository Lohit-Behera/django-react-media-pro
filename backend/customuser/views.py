from django.contrib.auth.hashers import make_password
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.urls import reverse
from django.shortcuts import redirect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.tokens import default_token_generator
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.views.decorators.csrf import csrf_exempt
from djangomediapro.settings import EMAIL_HOST_USER, MEDIA_ROOT, RAW_IMAGES, BASE_DIR

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import os

from .serializers import UserSerializerWithToken, UserSerializer, ContactUsSerializer

from .models import CustomUser, EmailVerificationToken, ContactUs

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@api_view(['POST'])
def register_user(request):
    data = request.data

    try:
        if CustomUser.objects.filter(email=data['email']).exists():
            return Response({'detail': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        first_name_lower = data['first_name'].lower()
        first_name = first_name_lower.replace(' ', '').capitalize()

        last_name_lower = data['last_name'].lower()
        last_name = last_name_lower.replace(' ', '').capitalize()

        email = data['email'].lower()
        
        user = CustomUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password(data['password']),
        )

        send_verification_email(request, user)

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        return Response({'detail': 'An error occurred while processing your request'}, status=status.HTTP_400_BAD_REQUEST)

def send_verification_email(request, user):
    try:
        token = generate_verification_token(user)
        current_site = get_current_site(request)
        verify_url = reverse('verify_email', args=[token])
        verify_link = f"http://{current_site.domain}{verify_url}"
        template_name = os.path.join(BASE_DIR, 'customuser/templates/customuser/verification_email.html')

        email_context = {
            'user': user,
            'verify_link' : verify_link
                         }
        html_message = render_to_string(
            template_name=template_name,
            context=email_context
            )
        plain_message = strip_tags(html_message)  
        subject = 'Verify Your Email Address'
        
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[user.email],
            html_message=html_message
            )
    except:
        return Response({'detail': 'An error occurred while sending verification email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def generate_verification_token(user):
    token = default_token_generator.make_token(user)
    EmailVerificationToken.objects.create(user=user, token=token)
    return token

@api_view(['GET'])
def verify_email(request, token):
    try:
        if not EmailVerificationToken.objects.filter(token=token).exists():
            return redirect('/login')
        
        email_verification_token = EmailVerificationToken.objects.get(token=token)
        user = email_verification_token.user
        user.is_verified = True
        user.save()
        email_verification_token.delete()
        return redirect('/login')
    except EmailVerificationToken.DoesNotExist:
        return redirect('/verify-expired')
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request,pk):
    user = CustomUser.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, pk):

    data = request.data
    user = CustomUser.objects.get(id=pk)

    user.email = data['email']
    user.first_name = data['first_name']
    user.last_name = data['last_name']

    profile_image = request.FILES.get('profile_image')
    if profile_image:
        user.profile_image = profile_image

    password = data.get('password')
    if password:
        user.make_password(password)

    user.save()
    return Response({'detail': 'User updated successfully'})

@api_view(['PUT'])
def create_contact_us(request):
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')
        contact = ContactUs.objects.create(
            name = name,
            email = email,
            subject = subject,
            message = message,
        )
        
        template_name = os.path.join(BASE_DIR, 'customuser/templates/customuser/contact_email.html')
        email_context = {
            'id': contact.id,
            'name': name,
            'email' : email,
            'subject' : subject,
            'message' : message
                         }
        
        html_message = render_to_string(
            template_name=template_name,
            context=email_context
            )
        plain_message = strip_tags(html_message)
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=EMAIL_HOST_USER,
            recipient_list=[email],
            html_message=html_message
            )
        return Response({'detail': 'Contact created successfully'})
    except:
        return Response({'detail': 'An error occurred while processing your request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_all_images(request):
    try:
        users = CustomUser.objects.all()
        profile_images = [user.profile_image for user in users if user.profile_image]

        file_list = []
        for i in profile_images:
            file_list.append(i)
        filenames = [file.name for file in file_list]

        profiles = []
        for i in filenames:
            split = i.split('/')
            profiles.append(split[1])

        for root, dirs, files in os.walk(MEDIA_ROOT):
            for file in files:
                if file not in profiles:
                    os.remove(os.path.join(root, file))
                        
        return Response({'detail': 'All images deleted successfully'}, status=200)
    except Exception as e:
        print(e)
        return Response({'detail': 'An error occurred while deleting images'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_raw_images(request):
    try:
        for root, dirs, files in os.walk(RAW_IMAGES):
            for file in files:
                os.remove(os.path.join(root, file))
        return Response({'detail': 'All images deleted successfully'}, status=200)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def edit_user(request, pk):
    user = CustomUser.objects.get(id=pk)
    data = request.data

    user.is_staff = data['is_staff']
    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def remove_admin(request, pk):
    user = CustomUser.objects.get(id=pk)
    data = request.data

    user.is_staff = data['is_staff']
    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = CustomUser.objects.all().order_by('email')

    page = request.query_params.get('page')
    paginator = Paginator(users, 10)

    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)

    serializer = UserSerializer(users, many=True)
    return Response({'users': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    user = CustomUser.objects.get(id=pk)
    user.delete()
    return Response({'detail': 'User deleted successfully'})