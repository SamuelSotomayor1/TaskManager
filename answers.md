# Cuestionario Técnico: NestJS & Backend

## Parte 1: Preguntas Teóricas
### 1. Explique la diferencia entre Middleware, Guard, Interceptor y Pipe en NestJS.
**Respuesta:**
Middleware: Es la primera capa. Se usa para funciones generales como logging o capturar información antes de que llegue a la lógica de la ruta (ej. morgan).
Guard: Se encarga de la seguridad. Decide si el usuario tiene permiso o no para entrar a la ruta
Interceptor: Se usa para transformar la respuesta. Permite modificar los datos justo antes de enviarlos al cliente.
Pipe: Se encarga de la validación y transformación.

### 2. ¿Cómo implementaría autorización basada en roles?
**Respuesta:**
Crearía un Enum con ADMIN y USER, usaría un @Roles para marcar qué rutas requieren permisos y de esta forma configurar los accesos según cada rol.

### 3. ¿Qué problemas aparecen cuando un backend crece mucho y cómo NestJS ayuda a resolverlos?
**Respuesta:**
Se encuentran problemas de rendimiento y mantenibilidad, ya que incluyen mayores funcionalidades y archivos que se vuelven gigantes, NestJS ayuda con la modularización, arquitectura sólida y la inyección de dependencias.

### 4. ¿Cómo manejaría configuración por ambiente (development, staging, production)?
**Respuesta:**
En development se configura el ambiente con un .env.local donde el desarrollador tiene completo acceso a la base de datos, en staging siendo un ambiente de prueba se pueden implementar herramientas como CI/CD antes del despligue y en producción la aplicación o el producto ya está desplegado por lo que se necesita una configuración crítica con información totalmente restringida.

### 5. ¿Cómo evitaría que dos usuarios compren el último producto disponible al mismo tiempo?
**Respuesta:**
Para resolver este problema se debe permitir al primer usuario terminar el proceso de compra, que termine de realizar la compra y descontar el stock, mientras que al segundo usuario se le bloquea el acceso y esta obligado a esperar hasta que el primer usuario finalice la transacción.

## Parte 2: Análisis y Debugging
### 1. Identifique al menos 5 problemas de arquitectura o diseño.
**Respuesta:**
1- El arreglo se guarda en una constante local, todo tipo de datos debe manejarse desde una base de datos.
2- El create(order) tiene un any implicito, aca vemos una inconsistencia que puede generar conflictos con TypeScript.
3- No utiliza un repositorio esto demuestra una mala arquitectura.
4- No tiene manejo de errores, esto genera que se reciba un error 500, cuando realmente el error debería especificar que el pedido no existe.
5- Fuerza que el servidor se caiga  ya que asume que el pedido siempre existe.

### 2. Explique cómo refactorizaría esta implementación en un proyecto real de NestJS.
**Respuesta:**
Cambio el arreglo por la inyección de un Repositorio de TypeORM, se realiza la función asincrona updateStatus, utilizo la función preload para buscar por id, y setear el nuevo estado, se crea el caso de que si el pedido no existe lanza un NotFoundException y finalmente el caso contrario done guarda el pedido correctamente con un save.