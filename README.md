# Task Management API 🚀

API desarrollada con **NestJS** para la gestión eficiente de tareas, aplicando principios de arquitectura limpia y tipado estricto.

## 🛠️ Stack 
- **Framework:** NestJS (Node.js)
- **Base de Datos:** PostgreSQL
- **ORM:** TypeORM
- **Pruebas:** Jest
- **Validación:** Class-Validator

## 🛠️ Estructura del Proyecto
src/
├── main.ts                # Punto de entrada de la APP
├── app.module.ts          # Módulo raíz (Conexión a DB y Providers)
└── tasks/                 # Módulo de Gestión de Tareas
    ├── dto/               # Data Transfer Objects (Validación de entrada)
    │   ├── create-task.dto.ts
    │   ├── update-task.dto.ts
    │   └── get-tasks-filter.dto.ts
    ├── entities/          # Definición de la tabla Task (TypeORM)
    │   └── task.entity.ts
    ├── tasks.controller.ts # Definición de rutas y verbos HTTP
    ├── tasks.service.ts    # Lógica de negocio y persistencia
    ├── tasks.service.spec.ts # Pruebas Unitarias del Servicio (Jest)
    └── tasks.module.ts     # Configuración del módulo de tareas

## ⚙️ Configuración del Entorno

1.  **Clonar el repositorio:** 
    ```bash
    git clone https://github.com/SamuelSotomayor1/TaskManager
    cd proyecto
    ```
2.  **Instalación de Dependencias:**
    ```bash
    pnpm install
3.  **Configurar Variables de Entorno:** * Crea un archivo `.env` en la raíz del proyecto.
    * Copia el contenido de `.env.example` y completa los datos de tu conexión de PostgreSQL (Asegúrate de crear la base de datos en **pgAdmin** o mediante SQL de forma manual antes de continuar).
4.  **Levantar el Servidor:**
    ```bash
    pnpm run start:dev
    ```
    *Al iniciar, el terminal confirmará el puerto de ejecución y la conexión exitosa a la base de datos.*

---

## 🚀 Guía de Uso (Endpoints)

Puedes utilizar **Postman**, **Insomnia** o cualquier cliente REST para interactuar con la API.

**URL Base:** `http://localhost:3000/api/tasks`

### 📋 Estructura de Datos (JSON)
Para las peticiones **POST** y **PATCH**, utiliza el siguiente formato en el cuerpo (*Body*):
Nota: Los estados permitidos son OPEN, IN_PROGRESS, DONE. Las prioridades son LOW, MEDIUM, HIGH.
```json
{
  "title": "Finalizar entrega",
  "description": "Revisar los últimos cambios antes del push",
  "status": "OPEN",
  "priority": "HIGH"
}

**URL Base:** `http://localhost:3000/api/tasks`

| Método | Endpoint | Descripción | Ejemplo / Query Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Obtener todas las tareas | `?status=OPEN&priority=HIGH` |
| **POST** | `/` | Crear nueva tarea | *(Requiere Body JSON)* |
| **PATCH** | `/:id` | Actualizar tarea | `/tasks/{uuid}` |
| **DELETE** | `/:id` | Eliminar tarea | `/tasks/{uuid}` |

---

### 💡 Ejemplos de uso rápido

**Listar con filtros (GET):**
> http://localhost:3000/api/tasks?status=OPEN&priority=HIGH

**Actualizar estado (PATCH):**
* **URL:** http://localhost:3000/api/tasks/tu-uuid-aqui
* **Body:**
```json
{
  "status": "DONE"
}

## 🧪 Testing
Se ha implementado pruebas unitarias para el `TasksService` que cubre la lógica de negocio, el manejo de excepciones y los filtros dinámicos incluyendo las 4 peticiones HTTP.

```bash
# Ejecutar todas las pruebas unitarias
pnpm test