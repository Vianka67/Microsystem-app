# Documentación Técnica - Microsystem App

Este documento sirve como referencia técnica para desarrolladores Frontend y Backend.

## 1. Arquitectura Clean Architecture

Ambos servicios siguen estrictamente los principios de Clean Architecture para garantizar mantenibilidad y escalabilidad.

### Capas del Sistema
1.  **Domain (Dominio)**:
    *   Contiene las **Entidades** (ej: `User`, `Product`) y las **Interfaces de Repositorio**.
    *   Es el núcleo del negocio, sin dependencias externas.
2.  **Application (Aplicación)**:
    *   Contiene los **Casos de Uso** (ej: `CreateProductUseCase`, `LoginUserUseCase`).
    *   Orquesta la lógica de negocio utilizando las interfaces del dominio.
3.  **Infrastructure (Infraestructura)**:
    *   Implementa las interfaces (ej: `DjangoUserRepository`, `InMemoryProductRepository`).
    *   Maneja bases de datos, APIs externas, etc.
4.  **Presentation (Presentación)**:
    *   Maneja la entrada/salida (HTTP).
    *   Controllers (NestJS) y Views (Django).

---

## 2. API Reference

### 🔐 Users Service (Puerto 8000)

**Base URL**: `http://localhost:8000/api`

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login/` | Iniciar sesión y obtener JWT | No |
| `POST` | `/auth/register/` | Registrar nuevo usuario | No |
| `GET` | `/users/profile/` | Obtener datos del usuario actual | **Sí** (Bearer Token) |

**Ejemplo Login Body**:
```json
{
  "email": "admin@microsystem.com",
  "password": "admin123"
}
```

### 📦 Products Service (Puerto 3000)

**Base URL**: `http://localhost:3000/products`

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Listar todos los productos | No |
| `GET` | `/:id` | Obtener detalle de producto | No |
| `POST` | `/` | Crear producto | No* |
| `PATCH` | `/:id` | Actualizar producto | No* |
| `DELETE` | `/:id` | Eliminar producto | No* |

*\*Nota: Actualmente los endpoints de escritura son públicos. Se recomienda implementar JWT Guard en el futuro.*

**Ejemplo Product Object**:
```json
{
  "id": 1,
  "name": "Laptop Gamer",
  "price": 1500,
  "stock": 5,
  "category": "Laptops"
}
```

---

## 3. Guía de Integración Frontend

Para conectar tu aplicación React/Vite con estos servicios:

### Variables de Entorno (.env)
```env
VITE_API_USERS=http://localhost:8000/api
VITE_API_PRODUCTS=http://localhost:3000/products
```

### Flujo de Autenticación Recomendado
1.  El usuario ingresa credenciales en el Frontend.
2.  Frontend llama a `POST /auth/login/`.
3.  Backend responde con `access` (Token JWT).
4.  Frontend guarda el token en `localStorage`.
5.  Para peticiones autenticadas, enviar header: `Authorization: Bearer <token>`.

### Manejo de Errores Comunes
*   **CORS Error**: Asegúrate de que el backend tenga tu origen permitido en `CORS_ALLOWED_ORIGINS` (`settings.py` en Django, `main.ts` en NestJS).
*   **Connection Refused**: Verifica que los servicios estén corriendo en los puertos correctos (8000 y 3000).

---

## 4. Base de Datos y Datos de Prueba

*   **Usuarios**: Se usa SQLite. Ejecuta `python manage.py init_admin` para crear el admin por defecto.
*   **Productos**: Se usa un repositorio en memoria. Al reiniciar el servicio, los datos vuelven a su estado inicial (10 productos de computación precargados).
