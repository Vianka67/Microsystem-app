from django.contrib.auth import authenticate
from users.domain.services import AuthenticationService
from users.domain.entities import User
from users.infrastructure.repositories import DjangoUserRepository

class DjangoAuthenticationService(AuthenticationService):
    def __init__(self):
        self.repository = DjangoUserRepository()

    def authenticate(self, email: str, password: str) -> User:
        # Django's authenticate takes username/password usually, but we can configure it or use User.check_password
        # However, standard authenticate() expects 'username' kwarg if using default backend, 
        # but since we might have email as username or custom backend, let's try passing email as username
        # or just use the repository to find and check password if we want to be explicit.
        # But to use Django's session/auth fully, `authenticate` is best.
        # Let's assume we pass email as username for now if that's how it's set up, 
        # OR we can manually check password if we just want to return the User entity.
        
        # Given the previous views.py used:
        # user = User.objects.get(email=email)
        # if user.check_password(password): ...
        
        # We can replicate that safely here.
        repo = DjangoUserRepository()
        user = repo.get_by_email(email)
        if user:
            # We need to check password. 
            # Problem: User entity might not have the hashed password or method to check it if it's a pure data class.
            # So we might need to rely on Django's model for the check.
            from django.contrib.auth.models import User as DjangoUser
            try:
                django_user = DjangoUser.objects.get(email=email)
                if django_user.check_password(password):
                    return user
            except DjangoUser.DoesNotExist:
                pass
        return None
