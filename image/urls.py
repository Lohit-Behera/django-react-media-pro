from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_image, name='upload_image'),

    path('removebg/', views.remove_bg, name='remove_bg'),
]