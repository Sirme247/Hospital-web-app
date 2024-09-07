require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
//const port = process.env.port ||5000  ;
const port = 5000 || process.env.port;

//Connect to DataBase
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'))

//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine','ejs');


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})  


