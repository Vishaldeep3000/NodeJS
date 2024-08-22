const express = require('express');
const app = express();
const db =  require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //as we know we are sendin data in JSON format from postMan

const PORT = process.env.PORT;
app.listen(PORT);

//stating URL
app.get('/', function(req, res){
    res.send("Hey I am your waiter, how can i help you ?");
})

const personRoutes = require('./routes/personRoutes'); //Import the router files
app.use('/person', personRoutes); //use the routes

const menuItemRouters = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRouters);




















app.get('/roti', (req, res) =>{
    res.send('Will bring it right away ... ');
})