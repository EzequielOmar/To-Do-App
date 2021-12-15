# To Do App
## _Node + Angular + MongoDb_

Tanto el cliente como el servidor estan hosteados en Heroku.
Para la base de datos se utilizó MongoDB.
(un cluster gratuito en -> https://cloud.mongodb.com/)

### Servidor (api)
##### https://eov-todo-api.herokuapp.com/


Endpoints ->
- GET -> "/"
    (all folders)
- GET -> "/:fid"
    (tasks by folders)
- POST -> "/:folderName"
    (post a new folder)
- POST -> "/:fid/:task"
    (post a new task by folder)
- DELETE -> "/:fid"
    (delete folder and tasks contained)
- DELETE -> "/:fid/:tid"
    (delete one task of one folder)
- PATCH -> "/:fid/:fname"
    (change folder name)
- PATCH -> "/:tid"
    (change task name or state) -> (receive task on body)

### Client
##### https://eov-todo-client.herokuapp.com/

Para el cliente se utilizó bootstrap5, bootstrap-icons y ng-bootstrap (éste último sólo para agregar tooltips).

## Installation
#### Server - Dev environment (nodemon)

```sh
cd server
npm i
node run dev
```
#### Client - Dev environment
Es necesario cambiar la url de la api, a la URL del servidor de desarrollo.
-- De otra forma los datos vienen de la api en producción --
Esta variable se encuentra guardada en app/services/task.service.ts en una constante llamada - baseUrl .
```sh
cd client
npm i
ng serve -o
```