from django.contrib import admin
from django.urls import path, include
from users.presentation import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', views.login_user, name='login'),
    path('api/auth/register/', views.register_user, name='register'),
    path('api/users/profile/', views.get_user_profile, name='profile'),
]