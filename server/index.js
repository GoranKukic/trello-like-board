const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// Using express.json to get data into JSON format
app.use(express.json());

//Port
const PORT = process.env.PORT || 5500;

// Using CORS
app.use(cors());

// importing routes
const TodoItemRoute = require('./routes/todoItems');

// Connecting to Mnogo DB database
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);


// Adding port and connecting to server
app.listen(PORT, ()=> console.log("Server connected") );