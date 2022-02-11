# To Do App v.1
#### _Node + Angular + MongoDb_
For the first version, we got a classical NodeJs Rest Api with a connection to a database capable of storing two entities: Folders, and Tasks. They have a relationship One to Many.
The client was built with AngulaJs, making Http requests to the api.


### Database (Mongodb)
Use Mongoose to connect to a MongoDB free cluster from this website -> https://cloud.monb.com/cluster

### Servidor (api)
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
For the client, use bootstrap5, bootstrap-icons y ng-bootstrap (this last-one only for putting some tooltips).

## Installation
#### Server - Dev environment (nodemon)

```sh
cd server
npm i
node run dev
```
#### Client - Dev environment
It is necessary to change the url of the api to the URL of the development server, otherwise the data come from api in production and changes in production won't take effect.
This variable is stored in app/services/task.service.ts.
```sh
cd client
npm i
ng serve -o
```
