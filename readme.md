# Actividad Práctica: Desarrollo con TypeScript

## Objetivo

Desarrollar una aplicación backend para la gestión del inventario de equipos informáticos de una empresa, utilizando TypeScript, una base de datos a elección (mysql, pg o mongodb), autenticación con JSON Web Token (JWT), validaciones y aplicando buenas prácticas de modularización.

## Contexto

La empresa FORMOTEX se dedica al mantenimiento y distribución de equipos informáticos para diversas organizaciones. Actualmente, el inventario se gestiona de forma manual, lo que genera errores frecuentes como:

- Información desactualizada del estado de los equipos
- Falta de control de ubicación
- Dificultad para saber quién es el responsable de cada equipo

La nueva aplicación deberá permitir un control centralizado, seguro y validado del inventario. Además, cada alumno deberá definir, según su propia abstracción, las funcionalidades adicionales, propiedades y relaciones que consideren necesarias para un manejo completo y eficiente de los equipos informáticos dentro del sistema.

## Requerimientos

### 1. Funcionalidades CRUD

- La aplicación debe permitir las operaciones básicas de gestión de equipos informáticos
- Solo los usuarios autenticados podrán acceder a los endpoints protegidos
- Cada equipo debe estar asignado a un responsable (un usuario de la empresa)
- Las entidades no deben ser simples; se espera que los equipos tengan propiedades más allá de solo nombre y responsable

### 2. Autenticación con JWT

- Implementar un sistema de autenticación utilizando JWT
- Los usuarios deben iniciar sesión utilizando un endpoint de autenticación
- Al autenticarse, el backend debe generar un token firmado que será usado para acceder a los endpoints protegidos
- Definir al menos dos roles de usuario:
  - **admin**: acceso total a la aplicación (gestión de usuarios, equipos, asignaciones, eliminación)
  - **user**: acceso limitado (gestionar únicamente los equipos a su cargo o alguna funcionalidad que se considere)
- Los endpoints deben requerir un token válido, y un rol específico de usuario en el caso que lo necesite

**Endpoints:**

- `POST api/auth/login`: Debe permitir a los usuarios autenticarse con sus credenciales (usuario y contraseña)
- `POST api/auth/register`: Debe permitir el registro de nuevos usuarios (restringido a administradores)
- Todos los demás endpoints (no relacionados con autenticación) deben comenzar, como mínimo, con el prefijo `/api/...`
- Cada alumno deberá diseñar y documentar los endpoints restantes de acuerdo con las funcionalidades, relaciones y validaciones que definan en su modelo de inventario

### 3. Backend con TypeScript

- El proyecto debe desarrollarse utilizando **Node.js + Express + TypeScript**, aplicando tipado estricto y buenas prácticas de organización
- La lógica de negocio debe implementarse en una capa de **servicios**, manteniendo a los **controladores** únicamente para la gestión de solicitudes y respuestas
- Se deben utilizar **helpers** y **middlewares** para tareas comunes (ej: manejo de tokens, validaciones, etc)
- Las validaciones pueden implementarse mediante librerías como **express-validator** o con funciones propias diseñadas como helpers

### 4. Validaciones y Control de Acceso a Endpoints

- Todos los endpoints deben contar con validaciones
- Se debe implementar un sistema de permisos basado en roles
- El sistema debe implementar validaciones de unicidad en las entidades principales
- Se espera que no puedan registrarse datos duplicados (ejemplo: email)
- Cada alumno debe investigar y decidir:
  - Cómo organizar las validaciones (middlewares, servicios, controladores, helpers)
  - Cómo manejar las respuestas y errores (códigos de estado HTTP, mensajes personalizados)

El objetivo es que cada alumno aplique criterio propio y pueda justificar sus decisiones técnicas.

### 5. Documentación requerida

En un archivo **README.md** en el proyecto se deberá incluir, como mínimo:

- Instrucciones para ejecutar el proyecto: dependencias necesarias, comandos para iniciar el backend, configuración de variables de entorno, etc
- Justificación técnica: explicación detallada de las decisiones tomadas respecto a:
  - Diseño de relaciones entre entidades
  - Organización de carpetas
  - Propiedades relevantes elegidas para cada entidad
  - Elección de librerías o patrones de arquitectura

## Criterios de Evaluación

1. Correcta implementación de JWT y sistema de roles
2. Modularización adecuada (separación de controladores, servicios, entidades, helpers)
3. Uso de TypeScript con tipado estricto en todo el proyecto
4. Implementación de validaciones de unicidad y consistencia de datos
5. CRUD completo de equipos protegido por autenticación
6. Relación entre usuario y equipos implementada correctamente
7. Uso de helpers y middlewares reutilizables
8. Manejo correcto de errores y respuestas HTTP
9. Claridad en la justificación de las decisiones técnicas tomadas
