# Documentación Técnica - Microsystem Frontend

## 1. Visión General
Este proyecto es la interfaz de usuario (Frontend) para el sistema Microsystem. Está construido con **React** y **Vite**, siguiendo una **Arquitectura Limpia** para asegurar escalabilidad, mantenibilidad y separación de responsabilidades.

## 2. Stack Tecnológico
*   **Core**: React 18, Vite 4.
*   **Lenguaje**: JavaScript (ES6+).
*   **Estilos**: CSS3 con Variables (Custom Properties) para un sistema de diseño consistente.
*   **Enrutamiento**: React Router DOM v6.
*   **Estado Global**: React Context API (`AuthContext`).
*   **Cliente HTTP**: Axios (con interceptores para manejo de tokens).

## 3. Arquitectura del Proyecto
El proyecto sigue una estructura modular basada en responsabilidades:

```
src/
├── assets/          # Recursos estáticos (imágenes, fuentes)
├── components/      # Componentes UI reutilizables
│   ├── layout/      # Componentes estructurales (Sidebar, Header, MainLayout)
│   └── ui/          # Componentes genéricos (ProductForm, Modales)
├── context/         # Gestión de estado global (AuthContext)
├── hooks/           # Custom Hooks (useAuth)
├── pages/           # Vistas principales de la aplicación
│   ├── Login/       # Lógica y vista de autenticación
│   ├── Dashboard/   # Vista principal con métricas
│   ├── Products/    # CRUD de productos
│   └── Profile/     # Vista de perfil de usuario
├── routes/          # Configuración de rutas y protección (AppRoutes)
├── services/        # Comunicación con APIs (Backend)
│   ├── api.js       # Configuración de Axios e interceptores
│   ├── auth.service.js # Endpoints de autenticación
│   └── products.service.js # Endpoints de productos
└── App.jsx          # Punto de entrada y proveedores
```

## 4. Sistema de Diseño (UI/UX)
Se implementó un diseño minimalista y "Premium" utilizando CSS puro y variables globales definidas en `index.css`.

### Paleta de Colores
*   **Primary**: `#0f172a` (Slate 900) - Barra lateral, textos principales.
*   **Accent**: `#3b82f6` (Blue 500) - Botones, estados activos, enlaces.
*   **Background**: `#f8fafc` (Slate 50) - Fondo general de la aplicación.
*   **Surface**: `#ffffff` (White) - Tarjetas, modales, header.
*   **Text**: `#334155` (Slate 700) - Texto principal.

### Componentes Clave
*   **Tarjetas**: Uso de `box-shadow` suave y `border-radius` para elevar el contenido.
*   **Grid System**: CSS Grid para layouts responsivos en Dashboard y Productos.
*   **Modales**: Ventanas emergentes centradas con fondo oscuro semitransparente (`rgba`).

## 5. Integración con Backend (Microservicios)
El frontend está configurado para consumir dos microservicios independientes:

1.  **Users Service (Django)**
    *   **URL**: `http://localhost:8000/api`
    *   **Responsabilidad**: Autenticación (Login) y Perfil.
    *   **Auth**: JWT (JSON Web Tokens). El token se almacena en `localStorage` y se inyecta automáticamente en los headers mediante interceptores de Axios.

2.  **Products Service (NestJS)**
    *   **URL**: `http://localhost:3000/products`
    *   **Responsabilidad**: Gestión de inventario (CRUD).
    *   **Endpoints**:
        *   `GET /`: Listar productos.
        *   `POST /`: Crear producto.
        *   `PATCH /:id`: Actualizar producto.
        *   `DELETE /:id`: Eliminar producto.

## 6. Configuración de Entorno
El archivo `.env` en la raíz define las URLs de los servicios:
```env
VITE_API_USERS_URL=http://localhost:8000/api
VITE_API_PRODUCTS_URL=http://localhost:3000/products
```
