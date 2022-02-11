# To Do App v.3
#### _NestJs + MongoDb + Angular + Graphql + Jwt_
GraphQl api, with JWT validation, and connection to mongo database for the back-end. Angular for the client.

##### _Live App -> https://eov-todo-client.herokuapp.com/_
### Database (Mongo)
Use mongoose for the database conecction, conected to a **free** cluster of a MongoDB database.
- Of this website -> https://cloud.mongodb.com/ 

### GraphQl 
In order to make the change from Rest Api to graphql, we need to inject graphql module in app.module, and set some compile configurations.
I took the **schema first aproach**, so that means that the app will have to compile all the model schemas into a typescrypt file.
_(All the .graphql format files inside each entity folder, will compile into the graphql.ts in the root of the app)_ 



### JWT
If you make a GET request to the back-end login endpoint, you will be prompted to log in your google account. _(Internally it checks if exists an user that matches your google id, or create a new one.)_ 

If the log was correct, it should redirect you to the client home page, passing the JWT in the client url redirect. Otherwise just redirect to the client login page.

All the api endpoints use a Guard _(jstStrategy)_, that checks for the authentication header to have the jwt of an existing user.
Internally it passes the data of the jwt to the resolver, in order to use the session data to store the values in the database.

### Servidor (SCHEMAS - graphql api)
Choose Heroku to host the server, you should use the /graphql endpoint in order to make request from a client server, _(or play with the playground, but since you need to authenticate, you can't do mutch)_ ->
- https://eov-todo-api.herokuapp.com/graphql

Login endpoint:
- https://eov-todo-api.herokuapp.com/login

##### Users:
type User {
  _id: ID!
  name: String!
  provId: String!
  ufolders: [Folder]!
}

type Mutation {
  deleteUser: User
  updateUserName(name: String!): User!
}

type Query {
  User: User!
}

##### Folders:
type Folder {
  _id: ID!
  name: String!
  owner: String!
  ftasks: [Task]!
}

type Mutation {
  createFolder(name: String!): Folder!
  deleteFolder(_id: ID!): Folder
  updateFolder(payload: UpdateFolderInput!): Folder!
}

type Query {
  folders(owner: String!): [Folder]!
}

input UpdateFolderInput {
  _id: ID!
  name: String!
}

##### Tasks:
input CreateTaskInput {
  name: String!
  folder: ID!
}

type Task {
  _id: ID!
  name: String!
  done: Boolean!
  folder: ID!
}

type Mutation {
  createTask(payload: CreateTaskInput!): Task!
  deleteTask(_id: ID!): Task
  updateTask(payload: UpdateTaskInput!): Task!
}

type Query {
  tasks(folder: ID!): [Task]!
}

input UpdateTaskInput {
  _id: ID!
  name: String
  done: Boolean
}
### Client
Also Heroku to host the client -lol-, you can watch the app in this url -> 
- https://eov-todo-client.herokuapp.com/

Use bootstrap5, bootstrap-icons y ng-bootstrap (this last-one only for putting some tooltips).

In order to make the request to a graphql server, import the graphql.module into app.module, this module uses apollo and the api url to create the correct context for the request.
Also have to write the preset request in services/data/data.interface.ts and execute them in the services/data/data.service.ts.

The jwt is stored in the sessionStoragge memory, and managed in a simple way for now.

## Installation
#### Server - Dev environment
Use private keys and fixed url redirects for the google auth and the mongo conection, so if you want to recreate this server in a dev environment, there are several things you need to do:
- Create an account at https://cloud.mongodb.com/ , then click on connect to get your connection url.
- Replace the url you get from mongo database in the file app/app.module.ts
- Go to https://console.cloud.google.com/ and registrate your project, go to Apis and services>credentials, you need to generate a ClientId and clientSecret, and register your redirect urls in google clud console.
- Replace your ClientId and clientSecret in the file app/auth/services/googleStrategy.service.ts
- Replace the succes and fail redirect urls with the one your client use in the file app/auth/auth.controler.ts
- Finally you need to set your own jwt secret pass, in this two files: app/auth/services/auth.service.ts and app/auth/services/jwtStrategy.service.ts.
**In bolth files the pass should be the same**

Then you just run:
```sh
cd server
npm i
npm run start:dev 
```
#### Client - Dev environment
If you want to test it with your own version of the back-end server, you only need to change the url of the back-end in app/services/task.service.ts.

Currently there is not cors validation applied in the api, but you will have problems if you try to use a local client with the hosted api, becouse once you hit the back-end login url, it will redirect you to the client main page.

```sh
cd client
npm i
ng serve -o
```
