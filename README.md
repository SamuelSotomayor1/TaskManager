# Task Management API 🚀

API desarrollada con **NestJS** para la gestión eficiente de tareas, aplicando principios de arquitectura limpia y tipado estricto.

## 🛠️ Stack Tecnológico
- **Framework:** NestJS (Node.js)
- **Base de Datos:** PostgreSQL
- **ORM:** TypeORM
- **Pruebas:** Jest
- **Validación:** Class-Validator & Class-Transformer

## ⚙️ Configuración del Entorno

1.  **Clonar el repositorio:** Descarga el código en tu máquina local.
2.  **Configurar Variables de Entorno:** * Crea un archivo `.env` en la raíz del proyecto.
    * Copia el contenido de `.env.example` y completa los datos de tu conexión de PostgreSQL (Asegúrate de crear la base de datos en **pgAdmin** o mediante SQL antes de continuar).
3.  **Instalación de Dependencias:**
    ```bash
    pnpm install
    ```
4.  **Levantar el Servidor:**
    ```bash
    pnpm run start:dev
    ```
    *Al iniciar, el terminal confirmará el puerto de ejecución y la conexión exitosa a la base de datos.*

---

## Probar Endpoints
Puedes utilizar Postman, Insomnia o cualquier cliente REST para interactuar con la API. La URL base por defecto es: http://localhost:3000/api/tasks.

Estructura JSON 
Para las peticiones POST y PATCH, utiliza el siguiente formato:
{
  "title": "Finalizar entrega",
  "description": "Revisar los últimos cambios antes del push",
  "status": "OPEN", 
  "priority": "HIGH"
}
Nota: Los estados permitidos son OPEN, IN_PROGRESS, DONE. Las prioridades son LOW, MEDIUM, HIGH.

GET	/	Obtiene todas las tareas (soporta filtros con QueryParams)
Ejemplo: http://localhost:3000/api/tasks o http://localhost:3000/api/tasks?status=OPEN&priority=HIGH

POST / Crea una nueva tarea
Ejemplo: http://localhost:3000/api/tasks 

PATCH /:id Actualiza tareas
Requiere el ID de la tarea en la URL. Solo envía los campos que deseas cambiar.
URL: http://localhost:3000/api/tasks/8e7f12... (reemplazar por un UUID válido)

DELETE /:id Elimina tareas
Ejemplo: http://localhost:3000/api/tasks/8e7f12...

## 🧪 Testing
Se ha implementado pruebas unitarias para el `TasksService` que cubre la lógica de negocio, el manejo de excepciones y los filtros dinámicos incluyendo las 4 peticiones HTTP.

```bash
# Ejecutar todas las pruebas unitarias
pnpm test