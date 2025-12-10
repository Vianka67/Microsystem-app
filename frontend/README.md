# Microsystem Frontend

Bienvenido al frontend de **Microsystem**, una aplicación moderna construida con React y Vite para la gestión de usuarios y productos.

## 🚀 Características

*   **Arquitectura Limpia**: Código modular y fácil de mantener.
*   **Diseño Premium**: Interfaz minimalista y responsiva.
*   **Gestión de Usuarios**: Login seguro con JWT.
*   **Gestión de Productos**: CRUD completo (Crear, Leer, Actualizar, Eliminar).
*   **Métricas**: Dashboard con visualización de datos clave.

## 📋 Requisitos Previos

*   **Node.js** (v16 o superior)
*   **npm** (o yarn)
*   **Backends Corriendo**:
    *   Users Service (Django) en puerto `8000`.
    *   Products Service (NestJS) en puerto `3000`.

## 🛠️ Instalación

1.  **Clonar el repositorio** (si no lo has hecho):
    ```bash
    git clone <url-del-repo>
    cd Microsystem-app-main/frontend
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Asegúrate de tener un archivo `.env` en la raíz de `frontend/` con el siguiente contenido:
    ```env
    VITE_API_USERS_URL=http://localhost:8000/api
    VITE_API_PRODUCTS_URL=http://localhost:3000/products
    ```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

## 🧪 Credenciales de Prueba

Si has cargado los datos de prueba en el backend, puedes usar:

*   **Email**: `admin@microsystem.com`
*   **Password**: `admin123`

## 📂 Estructura del Proyecto

Para más detalles sobre la arquitectura y los componentes, consulta el archivo [TECHNICAL_DOC.md](./TECHNICAL_DOC.md).
