const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

router.post('/detect', (req, res, next) => {

    axios.defaults.headers = {
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };
    console.log(req.params.returnFaceId);
    
    var params = {
            "returnFaceId": req.query.returnFaceId,
            "returnFaceLandmarks": req.query.returnFaceLandmarks,
            "returnFaceAttributes": req.query.returnFaceAttributes,
            "recognitionModel": "recognition_01",               //* RECOGNITION_02 IS BETTER FOR ACCURACY
            "returnRecognitionModel": true,
            "detectionModel": "detection_01"                    //* DETECTION_02 DOES NOT OFFER ATTRIBUTES AND LANDMARKS
    };
    console.log(req.body.url);
    
    //gender,age,emotion,hair,facialHair,accessories,glasses,makeup,smile,headPose,occlusion
    // .post(`/mails/users/sendVerificationMail`, null, { params: {
    //     mail,
    //     firstname
    //   }})

    axios.post(process.env.uriBaseDetect, {"url": req.body.url}, {params: params}
    ).then(response => {
        res.status(200).send(response.data)        
    }).catch(err => {
        console.log(err);
    })
});

router.put('/facelists/:facelistsId?', (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };


    const facelistsId = req.params.facelistsId;

    console.log(req.params.facelistsId);
    
    const url = process.env.uriBaseFaceList + "/" + req.params.facelistsId;
    console.log(url);
    

    axios.put(url, {
        "name": req.body.name,
        "userData": req.body.userData,
        "recognitionModel": req.body.recognitionModel
    }) 
    .then(response => {
        res.status(200).json({
            message: "Face list successfully created.",
            faceListId: req.params.facelistsId
        })
    }).catch(err => {
        console.log(err.response.data.error);
    })
});

router.get('/facelists/:facelistsId?', (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };
    var params = {
        "returnRecognitionModel": req.query.returnRecognitionModel //optional
    }

    const url = process.env.uriBaseFaceList + "/" + req.params.facelistsId;

    axios.get(url, {params: params})
        .then(response => {
            console.log(url);
            res.status(200).send(response.data)
        }).catch(err => {
            console.log(err.response.data.error); 
            res.send(err.response.data.error);  
        })

});

router.post('/facelists/:facelistsId?', (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };
    var params = {
        "userData": req.query.userData,
        "targetFace": req.query.targetFace,
        "returnDetectionnModel": req.query.returnDetectionnModel //optional
    };

    const url = process.env.uriBaseFaceList + "/" + req.params.facelistsId + "/persistedFaces";

    axios.post(url, {"url": req.body.url}, {params: params}
    ).then(response => {
        console.log(url);
        res.status(200).send(response.data)
    }).catch(err => {
        console.log(err);
    })
});

router.post('/similars', (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };

    axios.post(process.env.uriBaseFindSimilar, {
        "faceId": req.body.faceId,
        "faceListId": req.body.faceListId
    }).then(response => {
        console.log(process.env.uriBaseFindSimilar);
        res.status(200).send(response.data);
    }).catch(err => {
        console.log(err.response.data.error);
    })

});

  
module.exports = router;