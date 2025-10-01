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
├── routes/        # definicion endpoints
├── middlewares/   # validaciones y auth
├── utils/         # helpers
└── core/          # configuracion
```

por que asi:

- separacion responsabilidades
- facil mantenimiento
- codigo reutilizable

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
