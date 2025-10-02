# sistema gestion inventario equipos

## que hace

api backend para inventario de equipos informaticos con autenticacion jwt y roles

```bash
git clone repo
cd express-poo-ts
yarn install
```

## como configurarlo

crear archivo .env:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=tlp4
JWT_SECRET=clave-secreta
JWT_EXPIRES_IN=24h
```

crear base de datos:

```sql
CREATE DATABASE tlp4;
```

## como ejecutarlo

desarrollo:

```bash
yarn dev
```

produccion:

```bash
yarn start
```

servidor en http://localhost:3000

## justificacion tecnica

### relaciones entidades

user - equipment (1:muchos)

- un usuario puede tener muchos equipos
- cada equipo tiene un responsable

por que asi:

- trazabilidad clara
- control de acceso por usuario
- facil reasignacion

### organizacion carpetas

```
src/
├── controllers/    # manejo requests
├── models/        # entidades base datos
├── services/      # logica negocio
├── repositories/  # acceso a datos
├── routes/        # definicion endpoints
├── middlewares/   # validaciones y auth
├── utils/         # helpers
├── types/         # definiciones de tipos
└── core/          # configuracion
```

por que asi:

- separacion responsabilidades
- facil mantenimiento
- codigo reutilizable
- arquitectura escalable

### arquitectura

se implementa patron repositorio-servicio-controlador:

```
controller -> service -> repository -> model
```

- controller: maneja requests http, valida datos y delega logica
- service: contiene logica de negocio, coordina operaciones
- repository: abstrae acceso a datos, implementa operaciones crud
- model: representa entidades de base de datos

por que esta arquitectura:

- separacion clara de responsabilidades
- codigo mas mantenible y testeable
- facilita intercambio de implementaciones
- reduce duplicacion de codigo
- inyeccion de dependencias para mayor flexibilidad

### propiedades entidades

user:

- id: identificador
- email: login unico
- password: hash bcrypt
- role: admin o user
- name: nombre completo
- mobile: contacto

equipment:

- id: identificador
- serialNumber: numero serie unico
- name: descripcion
- type: categoria
- brand/model: especificaciones
- status: estado operativo
- location: ubicacion fisica
- purchaseDate: fecha compra
- warrantyExpiry: vencimiento garantia
- userId: responsable

por que estas propiedades:

- serialNumber para inventario real
- status para control operativo
- location para trazabilidad
- fechas para gestion garantias

### repositories

se implementan repositories para user y equipment:

- userrepository: gestiona operaciones crud de usuarios
- equipmentrepository: gestiona operaciones crud de equipos

interfaces comunes:

- find(): buscar multiples registros
- findbyid(): buscar por id
- create(): crear nuevo registro
- updatebyid(): actualizar registro
- deletebyid(): eliminar registro

metodos especializados:

- findbyemail(): buscar usuario por email
- findbyserialnumber(): buscar equipo por numero de serie
- findallwithuser(): obtener equipos con datos de usuario
- findbyuserid(): obtener equipos por usuario

por que repositories:

- abstraccion del acceso a datos
- centralizacion de consultas
- facilitan pruebas unitarias
- permiten cambiar implementacion sin afectar servicios

### inyeccion de dependencias

se implementa inyeccion de dependencias simple para controladores en las rutas:

```typescript
// enrutado
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
```

flujo de dependencias:

1. se instancia repository con acceso a datos
2. se instancia service con repository inyectado
3. se instancia controller con service inyectado
4. router usa controller para manejar requests

por que inyeccion de dependencias:

- codigo desacoplado
- facil para pruebas unitarias
- permite cambiar implementaciones
- mejora mantenibilidad

## endpoints

auth:

- POST /api/auth/login
- POST /api/auth/register (solo admin)

users:

- GET /api/users (solo admin)
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id (solo admin)

equipments:

- GET /api/equipments
- POST /api/equipments
- GET /api/equipments/:id
- PUT /api/equipments/:id
- DELETE /api/equipments/:id

## seguridad

- jwt en endpoints protegidos
- roles admin/user
- contraseñas hasheadas
- validacion datos entrada
- usuarios solo ven sus equipos
