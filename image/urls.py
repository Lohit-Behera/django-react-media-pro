from django.urls import path
from . import views

urlpatterns = [
    path('removebg/', views.remove_bg, name='remove_bg'),
    path('upscale/', views.upscale_image, name='upscale_image'),
    path('blurbg/', views.blur_bg, name='blur_bg'),

    path('removebg/<str:pk>/', views.get_remove_bg, name='get_remove_bg'),
    path('upscale/<str:pk>/', views.get_upscale, name='get_upscale'),
    path('blurbg/<str:pk>/', views.get_blur_bg, name='get_blur_bg'),

]