# To Do App v.2
#### _Node + Angular + MongoDb + NestJs + Graphql_
In this branch, change to NestJs for the server _(which internally use node and express)_, and modify the Rest Api format for a graphql one. This allows us to bring all the data in one query.

### Database (Mongo)
Use mongoose for the database conecction, and we take 
A free cluster of a MongoDB database was used for the storage.
- Of this website -> https://cloud.mongodb.com/ 

### GraphQl 
In order to make the change from Rest Api to graphql, we need to inject graphql module in app.module, and set some compile configurations.
I took the **schema first aproach**, so that means that the app will have to to compile all the model schemas into a typescrypt file.
_(All the .graphql format files inside each entity folder, will compile into the graphql.ts in the root of the app)_ 

### Servidor (SCHEMAS - graphql api)
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
For the client, use bootstrap5, bootstrap-icons y ng-bootstrap (this last-one only for putting some tooltips).

In order to make the request to a graphql server, import the graphql.module into app.module, this module uses apollo and the api url to create the correct context for the request.
Also have to write the preset request in services/data/data.interface.ts and execute them in the services/data/data.service.ts.

## Installation
#### Server - Dev environment (nodemon)

```sh
cd server
npm i
npm run start:dev 
```
#### Client - Dev environment
It is necessary to change the url of the api to the URL of the development server, otherwise the data come from api in production and changes in production won't take effect. This variable is stored in app/services/task.service.ts.

```sh
cd client
npm i
ng serve -o
```
