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