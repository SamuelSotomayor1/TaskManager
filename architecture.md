# Cuestionario Técnico: NestJS & Backend
## Diseño de Arquitectura

### 1. ¿Cómo escalaría esta API para soportar 1000 requests por segundo?
Para manejar esta carga la primera solución es implementar una escalabilidad horizontal, en lugar de tener un servidor potente, manejaría la información de forma distribuida con varios servidores pequeños, usando un Load Balancing que reciba las peticiones y las reparta equitativamente.

### 2. ¿Qué cambios haría si el sistema creciera a millones de tareas?
Si el sistema crece a millones de tareas, habrá que analizar si la base de datos actual resiste esa carga, debido a que las bases de datos SQL son más probables que sufran bajo esos números, a menos que tengan datos bien indexados, por otra parte utilizar una base de datos NoSQL permitiría un mayor rendimiento, flexibilidad y escalabilidad.

### 3. ¿Cómo implementaría autenticación JWT en este sistema?
Implementaría un flujo estándar de seguridad usando los módulos `@nestjs/jwt` y `@nestjs/passport`, crearía un módulo de autenticación para validar credenciales de usuario. Aplicaría un JwtAuthGuard para proteger las rutas de tareas, asegurando que cada tarea creada esté vinculada al ID del usuario extraído del token y por ultimo manejaria las contraseñas con bcrypt para nunca guardar contraseñas en texto plano en la base de datos.

### 4. ¿Cómo manejaría procesamiento asincrónico para tareas pesadas?
Uso de una cola de tareas, cuando el usuario pide una tarea pesada la API no la procesa pero crea un ticket o un mensaje indicando el estado de la petición.


### 5. ¿Cómo aseguraría la observabilidad del sistema en producción?
Configuraría notificaciones automáticas que se disparen solo cuando ocurra un error grave, para actuar de inmediato sin tener que estar mirando la pantalla todo el día.