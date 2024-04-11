from django.urls import path
from . import views

urlpatterns = [
    path('removebg/', views.remove_bg, name='remove_bg'),
    path('upscale/', views.upscale_image, name='upscale_image'),
    path('blurbg/', views.blur_bg, name='blur_bg'),
    path('filterd/', views.filtered_image, name='filtered_image'),
    path('convert/', views.convert, name='convert'),
    path('downscale/', views.down_scale, name='down_scale'),
    path('grayscalebg/', views.gray_scale_bg, name='gray_scale_bg'),
    path('animal/', views.animal, name='animal'),

    path('removebg/<str:pk>/', views.get_remove_bg, name='get_remove_bg'),
    path('upscale/<str:pk>/', views.get_upscale, name='get_upscale'),
    path('blurbg/<str:pk>/', views.get_blur_bg, name='get_blur_bg'),
    path('filterd/<str:pk>/', views.get_filtered_image, name='get_filtered_image'),
    path('convert/<str:pk>/', views.get_convert, name='get_convert'),
    path('downscale/<str:pk>/', views.get_down_scale, name='get_down_scale'),
    path('grayscalebg/<str:pk>/', views.get_gray_scale_bg, name='get_gray_scale_bg'),


]