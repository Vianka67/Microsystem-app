# Microsystem App - Monorepo

Este proyecto es un sistema de microservicios para una tienda de computadoras, construido con **Clean Architecture**.

## 🏗 Arquitectura del Sistema

El sistema está dividido en dos servicios backend independientes y un frontend (desacoplado):

1.  **Users Service (`users-service`)**:
    *   **Tecnología**: Python / Django REST Framework.
    *   **Responsabilidad**: Autenticación (JWT), Gestión de Usuarios.
    *   **Puerto**: `8000`.
    *   **Base de Datos**: SQLite (`db.sqlite3`).

2.  **Products Service (`products-service`)**:
    *   **Tecnología**: Node.js / NestJS.
    *   **Responsabilidad**: Catálogo de Productos (CRUD).
    *   **Puerto**: `3000`.
    *   **Persistencia**: En memoria (simulada con Repositorio).

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para levantar todo el entorno de desarrollo.

### Prerrequisitos
*   Python 3.10+
*   Node.js 18+
*   Git

### 1. Configuración del Backend de Usuarios (Django)

```bash
cd users-service

# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Aplicar migraciones (crear tablas en DB)
python manage.py migrate

# 3. Crear usuario administrador por defecto
# Crea: admin@microsystem.com / admin123
python manage.py init_admin

# 4. Iniciar el servidor
python manage.py runserver
```
> El servicio estará disponible en: `http://localhost:8000`

### 2. Configuración del Backend de Productos (NestJS)

```bash
cd products-service

# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor en modo desarrollo
npm run start:dev
```
> El servicio estará disponible en: `http://localhost:3000`

---

## 🛠 Comandos Útiles

### Users Service (Django)
*   **Crear Superusuario manual**: `python manage.py createsuperuser`
*   **Ver Panel Admin**: Ir a `http://localhost:8000/admin`
*   **Resetear DB**: Borrar `db.sqlite3` y correr `python manage.py migrate` nuevamente.

### Products Service (NestJS)
*   **Compilar**: `npm run build`
*   **Tests**: `npm run test`

---

## 📂 Estructura del Proyecto

```
Microsystem-app-main/
├── users-service/       # Backend Django (Clean Architecture)
│   ├── users/
│   │   ├── domain/      # Entidades y Repositorios (Interfaces)
│   │   ├── application/ # Casos de Uso
│   │   ├── infrastructure/ # Implementación de Repositorios
│   │   └── presentation/   # Vistas API
│   └── manage.py
│
├── products-service/    # Backend NestJS (Clean Architecture)
│   ├── src/products/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── main.ts
│
└── TECHNICAL_DOCS.md    # Documentación Técnica detallada y API
```
