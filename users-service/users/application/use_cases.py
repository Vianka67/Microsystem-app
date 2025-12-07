from users.domain.repositories import UserRepository
from users.domain.entities import User
from users.domain.services import AuthenticationService

class RegisterUserUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, username: str, email: str, password: str) -> User:
        if self.user_repository.exists(email):
            raise ValueError("User already exists")
        
        new_user = User(id=None, username=username, email=email, password=password)
        return self.user_repository.create(new_user)

class LoginUserUseCase:
    def __init__(self, auth_service: AuthenticationService):
        self.auth_service = auth_service

    def execute(self, email: str, password: str) -> User:
        return self.auth_service.authenticate(email, password)

class GetUserProfileUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, email: str) -> User:
        return self.user_repository.get_by_email(email)
