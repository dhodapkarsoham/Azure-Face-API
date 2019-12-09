const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser')
dotenv.config();

const port = process.env.PORT || 3000;
const faceRoute = require('./api/routes/face');

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', faceRoute);

app.listen(port, () => console.log('Server running'));