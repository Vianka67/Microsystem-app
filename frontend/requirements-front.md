# Requerimientos para el Frontend (Microsystem App)

Este documento detalla cómo conectar el Frontend (React/Next.js/etc.) con los microservicios del Backend.

## 1. Arquitectura General

El sistema consta de dos servicios backend independientes:

*   **Users Service (Django)**: Maneja autenticación y usuarios. Puerto: `8000`.
*   **Products Service (NestJS)**: Maneja el catálogo de productos. Puerto: `3000`.

## 2. Autenticación (Users Service)

**Base URL**: `http://localhost:8000/api/auth`

### Login
*   **Endpoint**: `POST /login/`
*   **Body**:
    ```json
    {
      "email": "admin@microsystem.com",
      "password": "admin123"
    }
    ```
*   **Respuesta Exitosa (200 OK)**:
    ```json
    {
      "access": "eyJ0eXAi...",  // Guardar este token (JWT)
      "refresh": "eyJ0eXAi...",
      "user": {
        "id": 1,
        "email": "admin@microsystem.com",
        "username": "admin"
      }
    }
    ```

### Registro
*   **Endpoint**: `POST /register/`
*   **Body**:
    ```json
    {
      "email": "nuevo@usuario.com",
      "password": "password123",
      "username": "nuevo"
    }
    ```

### Perfil (Requiere Token)
*   **Endpoint**: `GET /api/users/profile/`
*   **Headers**: `Authorization: Bearer <access_token>`

## 3. Productos (Products Service)

**Base URL**: `http://localhost:3000/products`

### Listar Productos
*   **Endpoint**: `GET /`
*   **Respuesta**: Array de objetos producto.
    ```json
    [
      {
        "id": 1,
        "name": "MacBook Pro 16\" M3 Max",
        "price": 3499,
        "category": "Laptops",
        ...
      }
    ]
    ```

### Crear Producto
*   **Endpoint**: `POST /`
*   **Body**:
    ```json
    {
      "name": "Nuevo Producto",
      "price": 100,
      "stock": 10,
      "category": "Accesorios"
    }
    ```

### Editar Producto
*   **Endpoint**: `PATCH /:id` (Ej: `/1`)
*   **Body**: Enviar solo los campos a modificar.

### Eliminar Producto
*   **Endpoint**: `DELETE /:id` (Ej: `/1`)

## 4. Notas Importantes

*   **CORS**: Ambos servicios están configurados para aceptar peticiones desde `http://localhost:5173` (Vite) y `http://localhost:3000`. Si tu frontend corre en otro puerto, avisa al backend.
*   **Manejo de Errores**:
    *   401 Unauthorized: El token expiró o es inválido. Redirigir al login.
    *   400 Bad Request: Datos inválidos en el formulario.

## 5. Recomendaciones de Arquitectura Frontend

Para armar el frontend "bien" y escalable, se recomienda seguir esta estructura:

### Estructura de Carpetas Sugerida
```
src/
├── assets/          # Imágenes, fuentes, estilos globales
├── components/      # Componentes UI reutilizables (Botones, Inputs, Cards)
├── context/         # Contextos de React (AuthContext, ThemeContext)
├── hooks/           # Custom Hooks (useAuth, useProducts)
├── layouts/         # Layouts de páginas (MainLayout, AuthLayout)
├── pages/           # Páginas de la aplicación (Login, Dashboard, Products)
├── services/        # Lógica de conexión con APIs (Axios/Fetch)
│   ├── api.js       # Configuración base de Axios (Interceptors)
│   ├── auth.js      # Servicios de Auth (login, register)
│   └── products.js  # Servicios de Productos (CRUD)
├── utils/           # Utilidades y constantes
└── App.jsx          # Configuración de Rutas
```

### Mejores Prácticas de Integración

1.  **Variables de Entorno**:
    No hardcodees las URLs. Usa un archivo `.env`:
    ```env
    VITE_API_USERS_URL=http://localhost:8000/api
    VITE_API_PRODUCTS_URL=http://localhost:3000/products
    ```

2.  **Servicios Centralizados**:
    No hagas `fetch` dentro de los componentes. Crea archivos de servicio:
    ```javascript
    // services/products.js
    import api from './api';

    export const getProducts = async () => {
      const response = await api.get('/products');
      return response.data;
    };
    ```

3.  **Manejo de Tokens (AuthContext)**:
    *   Guarda el `access_token` en `localStorage` o Cookies al hacer login.
    *   Crea un `AuthContext` que lea este token al iniciar la app para mantener la sesión.
    *   Usa "Interceptors" de Axios para inyectar el token automáticamente en cada petición:
        ```javascript
        api.interceptors.request.use(config => {
          const token = localStorage.getItem('token');
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
        ```

4.  **Protección de Rutas**:
    Crea un componente `<ProtectedRoute>` que verifique si existe el usuario en el contexto. Si no, redirige a `/login`.

## 6. Pasos para Iniciar el Entorno de Desarrollo

Para trabajar en el frontend, necesitas tener el backend corriendo:

1.  **Terminal 1 (Usuarios)**:
    ```bash
    cd users-service
    python manage.py runserver
    ```

2.  **Terminal 2 (Productos)**:
    ```bash
    cd products-service
    npm run start:dev
    ```

3.  **Terminal 3 (Tu Frontend)**:
    ```bash
    npm run dev
    ```
