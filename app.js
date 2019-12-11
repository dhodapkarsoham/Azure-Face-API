const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
dotenv.config();

const port = process.env.PORT || 3000;

// DECLARING ROUTES
const faceRoute = require('./api/routes/face');
const checkAuth = require('./api/middleware/checkAuth');
const loginRoute = require('./api/routes/login');

//  CONNECT TO THE DATABASE
mongoose.connect(
    process.env.MONGO_ATLAS_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    () => console.log('DB connected')
);

// HANDLING CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTES TO HANDLE THE REQUESTS

//! REMOVE THE 'face' AND JUST KEEP '/'
app.use('/', faceRoute);

//! ROUTES TO HANDLE REQUESTS IF JWT AUTH IS USED
// app.use('/', checkAuth, faceRoute);

//! USER SIGN-IN ROUTE IF AUTH IS GOING TO BE USED
// app.use('/login', loginRoute); 

//! USER SIGN-UP ROUTE IF AUTH IS GOING TO BE USED
// app.use('/user', userRoute);

app.listen(port, () => console.log('Server running'));