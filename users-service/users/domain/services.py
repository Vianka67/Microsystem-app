from abc import ABC, abstractmethod
from typing import Optional
from .entities import User

class AuthenticationService(ABC):
    @abstractmethod
    def authenticate(self, email: str, password: str) -> Optional[User]:
        pass
