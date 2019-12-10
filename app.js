const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
dotenv.config();

const port = process.env.PORT || 3000;

// DECLARING ROUTES
const faceRoute = require('./api/routes/face');
const userRoute = require('./api/routes/user');

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

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ROUTES TO HANDLE THE REQUESTS

//! REMOVE THE 'face' AND JUST KEEP '/'
app.use('/face', faceRoute);

//! COMMENT THIS OUT
app.use('/', userRoute);

app.listen(port, () => console.log('Server running'));