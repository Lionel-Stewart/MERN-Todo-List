//Dependencies
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const express        = require("express");
const cors           = require("cors");
const app            = express();

//Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Database
const database = require('./config/database').mongoURI;
mongoose
  .connect(database, {useNewUrlParser: true})
  .then(() => {console.log("Connected to Database")})
  .catch(err => {console.log(err)});

//Routes 
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

module.exports = app;