from django.contrib.auth.models import User as DjangoUser
from users.domain.entities import User
from users.domain.repositories import UserRepository

class DjangoUserRepository(UserRepository):
    def get_by_email(self, email: str) -> User:
        try:
            django_user = DjangoUser.objects.get(email=email)
            return self._to_domain(django_user)
        except DjangoUser.DoesNotExist:
            return None

    def create(self, user: User) -> User:
        django_user = DjangoUser.objects.create_user(
            username=user.username,
            email=user.email,
            password=user.password
        )
        return self._to_domain(django_user)

    def exists(self, email: str) -> bool:
        return DjangoUser.objects.filter(email=email).exists()

    def _to_domain(self, django_user: DjangoUser) -> User:
        return User(
            id=django_user.id,
            username=django_user.username,
            email=django_user.email,
            password=django_user.password
        )
