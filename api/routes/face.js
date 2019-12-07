'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const subscriptionKey = process.env.subscriptionKEY;

//* PARAMETERS TO GO INTO THE URL
const params = {
    "returnFaceId": true,
    "returnFaceLandmarks": true,
    "returnFaceAttributes": "gender,age,emotion,hair,facialHair,accessories,glasses,makeup,smile,headPose,occlusion",
    "recognitionModel": "recognition_02",               //* RECOGNITION_02 IS BETTER FOR ACCURACY
    "returnRecognitionModel": true,
    "detectionModel": "detection_01"                    //* DETECTION_02 DOES NOT OFFER ATTRIBUTES AND LANDMARKS
}

//* HEADERS FOR THE REQUEST;
const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key" : subscriptionKey
}

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';


// const options = {
//     uri: process.env.uriBase,
//     qs: params,
//     body: '{"url": ' + '"' + imageUrl + '"}',
//     headers: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key' : subscriptionKey
//     }
// };


  
module.exports = router();