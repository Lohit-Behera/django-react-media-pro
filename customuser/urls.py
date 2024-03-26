from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),

    path('verify/<str:token>/', views.verify_email, name='verify_email'),
    
    path('details/<str:pk>/', views.get_user_details, name='get_user_details'),
    
    path('update/<str:pk>/', views.update_user, name='update_use'),
]
