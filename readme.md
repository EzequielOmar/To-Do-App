# To Do App - Branch NestJs
## _Node + Angular + MongoDb_  * + NestJs + Graphql

En esta rama, se modificó el servidor, que previamente había sido realizado en formato Rest Api con node Js, el nuevo servidor fue realizado con nestJs, en formato de api graphql, a modo de realizar menos consultas y mas veloces para traer la información.

Tanto el cliente como el servidor estan hosteados en Heroku.
Para la base de datos se utilizó MongoDB.
(un cluster gratuito en -> https://cloud.mongodb.com/)

### Servidor (SCHEMAS - graphql api)
##### https://eov-todo-api.herokuapp.com/

##### Folders:

type Folder {
  _id: ID!
  name: String!
  ftasks: [Task!]!
}

input CreateFolderInput {
  name: String!
}

input ListFolderInput {
  _id: ID
  name: String
}

input UpdateFolderInput {
  _id: ID!
  name: String!
}

type Query {
  folders(filters: ListFolderInput): [Folder!]!
}

type Mutation {
  createFolder(payload: CreateFolderInput!): Folder!
  deleteFolder(_id: ID!): Folder!
  updateFolder(payload: UpdateFolderInput!): Folder!
}

##### Tasks:

type Task {
  _id: ID!
  name: String!
  done: Boolean!
  folder: ID!
}

input CreateTaskInput {
  name: String!
  folder: ID!
}

input ListTaskInput {
  _id: ID
  name: String
  done: Boolean
  folder: ID
}

input UpdateTaskInput {
  _id: ID!
  name: String
  done: Boolean
}

type Query {
  tasks(filters: ListTaskInput): [Task!]!
}

type Mutation {
  createTask(payload: CreateTaskInput!): Task!
  deleteTask(_id: ID!): Task!
  updateTask(payload: UpdateTaskInput!): Task!
}

### Client
##### https://eov-todo-client.herokuapp.com/

Para el cliente se utilizó bootstrap5, bootstrap-icons y ng-bootstrap (éste último sólo para agregar tooltips).

## Installation
#### Server - Dev environment (nodemon)

```sh
cd server
npm i
nest start --watch 
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