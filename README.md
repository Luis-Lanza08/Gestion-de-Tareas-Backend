
# Backend - Gestor de Tareas

Este es el backend del proyecto **Gestor de Tareas**, una API RESTful construida con Node.js, Express y Sequelize para manejar autenticación y operaciones CRUD sobre tareas.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT (autenticación)
- Bcrypt (hash de contraseñas)

---

## Configuración del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/tu_repo_backend.git
cd backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del backend con el siguiente contenido:

```env
DATABASE_URL=p RENDER_DB_URL
JWT_SECRET= CLAVE_SECRETA
PORT=5432

```

---

## Endpoints disponibles

| Método | Ruta | Descripcién |
|--------|------|-------------|
| POST   | `/api/auth/register` | Registro de usuarios |
| POST   | `/api/auth/login` | Inicio de sesién |
| GET    | `/api/auth/me` | Obtener usuario actual |
| POST   | `/api/tasks` | Crear nueva tarea |
| GET    | `/api/tasks` | Obtener tareas (con filtros) |
| GET    | `/api/tasks/:id` | Obtener una tarea por ID |
| PUT    | `/api/tasks/:id` | Actualizar tarea |
| DELETE | `/api/tasks/:id` | Eliminar tarea (solo si está completada) |


### Filtros disponibles en `GET /api/tasks`

Puedes enviar los siguientes parámetros opcionales en la URL para filtrar tareas:

- `status`: `"pendiente"`, `"en progreso"`, `"completada"`
- `from` y `to`: fechas de vencimiento (YYYY-MM-DD)
- `createdFrom` y `createdTo`: fechas de creación
- `search`: palabra clave en título o descripción

**Ejemplo:**
GET /api/tasks?search=react&status=pendiente&from=2025-04-01&to=2025-04-20

---

## Ejecutar localmente

```bash
node server.js
```

El servidor quedará corriendo en `http://localhost:4000`.

---

## Despliegue

Este backend fue desplegado en [Render](https://render.com/).  
Asegurate de configurar las variables de entorno en el dashboard de Render y de conectar con una base de datos PostgreSQL.
