const mongoose = require('mongoose');

//const mongoURL = 'mongodb://localhost:27017/hotels'; //replace 'db' with our DataBase name
const mongoURL = 'mongodb+srv://helloworld:Test123@cluster0.vdcry.mongodb.net/'; 

//Set up mongoDB connections
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connectio object represting the MBD connection

const db = mongoose.connection;

//Define event listeners for DB connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection errors: ', err);
});

db.on('disconnected', ()=> {
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports = db;


