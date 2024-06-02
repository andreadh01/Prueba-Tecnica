## Instalación
Crear una base de datos en MySQL
```sh
CREATE DATABASE prueba_tecnica;
```
Clonar el repositorio e instalar las dependencias
```sh
cd Prueba-Tecnica
npm i
```
Crear un archivo *.env* con las siguientes variables:
```sh
MYSQL_USER='root' # El usuario de mysql
MYSQL_PASSWORD='' # La contraseña de mysql
DATABASE='prueba_tecnica' # El nombre de la base de datos
JWT_SECRET='0ezTfeVGKf88dPoUXlt7kJBo55VOrDQCIxWUPqlMv+g='
```
Corre el servidor
```sh
npm run dev
```
Instala las dependencias del cliente
```sh
cd client
npm i
```
Corre el cliente
```sh
npm start
```
Abre http://localhost:3000 en tu navegador para usar la página

## Documentación de la API
Si prefiere, puede probar la API con Postman. El servidor corre en el puerto 4800 (http://localhost:4800). Los endpoints son los siguientes:

### Autenticación
POST /auth/login -> En esta ruta un usuario registrado puede iniciar sesión para generar su token de autenticación.
```sh
{ 
    "email": "prueba@dominio.com",
    "password": "123456A!"
}
```
POST /auth/logout -> En esta ruta el usuario puede cerrar sesión para que su token se elimine.
GET /auth/validarToken -> Esta ruta valida si el token del cliente es auténtico.

### Clientes
GET /clientes -> Esta ruta regresa una lista de todos los clientes, debe estar autenticado para usarla.
GET /clientes/:id -> Esta ruta regresa el cliente según el ID especificado, debe estar autenticado para usarla.
POST /clientes/agregar -> Esta ruta registra/agrega un usuario, la pueden usar usuarios autenticados así como los que no están.
```sh
{ 
    // Todos los campos son obligatorios
    "name": "Prueba",
    "phone": "6621111111",
    "email": "prueba@dominio.com",
    "password": "123456A!"
}
```
PUT /clientes/editar -> Esta ruta edita el cliente según el ID especificado, debe estar autenticado para usarla. Solo se modifican los campos enviados.
```sh
{ 
    "id": "1", // Este campo es obligatorio
    "name": "Prueba",
    "phone": "6621111111",
    "email": "prueba@dominio.com",
    "password": "123456A!"
}
```
DELETE /clientes/eliminar/:id -> Esta ruta elimina el cliente según el ID especificado, debe estar autenticado para usarla. Si el usuario eliminado es igual al usuario autenticado, se cierra la sesión.