from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User as DjangoUser

# Clean Architecture Imports
from users.infrastructure.repositories import DjangoUserRepository
from users.infrastructure.services import DjangoAuthenticationService
from users.application.use_cases import LoginUserUseCase, RegisterUserUseCase, GetUserProfileUseCase

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    # Dependency Injection
    auth_service = DjangoAuthenticationService()
    use_case = LoginUserUseCase(auth_service)
    
    user = use_case.execute(email, password)
    
    if user:
        # Infrastructure/Presentation concern: Generate Token
        # We need the Django User object for SimpleJWT
        try:
            django_user = DjangoUser.objects.get(id=user.id)
            refresh = RefreshToken.for_user(django_user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username
                }
            })
        except DjangoUser.DoesNotExist:
            pass # Should not happen if user exists
            
    return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = request.data.get('username', email)
    
    # Dependency Injection
    user_repo = DjangoUserRepository()
    use_case = RegisterUserUseCase(user_repo)
    
    try:
        user = use_case.execute(username, email, password)
        
        # Generate Token
        django_user = DjangoUser.objects.get(id=user.id)
        refresh = RefreshToken.for_user(django_user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username
            }
        })
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    # request.user is the Django User object set by DRF Authentication
    email = request.user.email
    
    # Dependency Injection
    user_repo = DjangoUserRepository()
    use_case = GetUserProfileUseCase(user_repo)
    
    user = use_case.execute(email)
    
    if user:
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username
        })
    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)