from django.urls import path
from . import views

urlpatterns = [
    path('removebg/', views.remove_bg, name='remove_bg'),
    path('upscale/', views.upscale_image, name='upscale_image'),

    path('removebg/<str:pk>/', views.get_remove_bg, name='get_remove_bg'),
    path('upscale/<str:pk>/', views.get_upscale, name='get_upscale'),

]