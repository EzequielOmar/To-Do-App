const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const taskRoutes = require("./routes/api-router");

//app
const app = express();
const PORT = 8080;

// connection String to MongoDB
const dbURI =
  "mongodb+srv://todo-api:todo-api@cluster0.3mcnq.mongodb.net/todo-app?retryWrites=true&w=majority";

// connect to mongodb or show error
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function (result) {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

// Apply CORS policy
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//task routes
app.use("/", taskRoutes);

// Assign the port number to our app
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
