const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const checkAuth = require('../middleware/checkAuth');


//* (1) DETECT FEATURES OF AN IMAGE

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
    
    axios.post(process.env.uriBaseDetect, {"url": req.body.url}, {params: params}
    ).then(response => {
        res.status(200).send(response.data)        
    }).catch(err => {
        console.log(err);
        res.json({
            err: error.response.data.error
        })
    })
});

//* (2) CREATE AN EMPTY FACE LIST

router.put('/facelists/:facelistsId', (req, res, next) => {
// router.put('/facelists/:facelistsId', checkAuth, (req, res, next) => {
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
        res.json({
            err: error.response.data.error
        })
    })
});

//* (3) GET FACELIST AND PERSISTED FACES INSIDE THE FACELIST

router.get('/facelists/:facelistsId', (req, res, next) => {
// router.get('/facelists/:facelistsId', checkAuth, (req, res, next) => {
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
            res.json({
                err: error.response.data.error
            })  
        })

});

//* (4) ADD AN IMAGE TO THE FACELIST

router.post('/facelists/:facelistsId', (req, res, next) => {
// router.post('/facelists/:facelistsId', checkAuth, (req, res, next) => {
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
        res.json({
            err: error.response.data.error
        })
    })
});

//* (5) FIND SIMILARITY BETWEEN A DETECTED FACE AND FACES INSIDE A FACELIST WITH SIMILARITY SCORE

router.post('/similars', (req, res, next) => {
// router.post('/similars', checkAuth, (req, res, next) => {
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
        res.json({
            err: error.response.data.error
        })
    })

});

//* (6) GET A LIST OF ALL THE AVAILABLE FACELISTS

router.get('/facelists', (req, res, next) => {
// router.get('/facelists', checkAuth, (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };

    var params = {
        "returnRecognitionModel": req.query.returnRecognitionModel //optional
    }

    axios.get(process.env.uriBaseFaceList, {params: params}
        ).then(response => {
            res.status(200).send(response.data)
        }).catch(err => {
            res.json({
                error: err.response.data.error
            })
        })
});

//* (7) DELETE A FACELIST

router.delete('/facelists/:facelistsId', (req, res, next) => {
// router.delete('/facelists/:facelistsId', checkAuth, (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };

    const url = process.env.uriBaseFaceList + "/" + req.params.facelistsId;

    axios.delete(url)
        .then(response => {
            console.log(url);
            res.status(200).json({
                message: "Deleted facelist succesfully!"
            })
        }).catch(err => {
            res.json({
                error: err.response.data.error
            })
        })
});

//* (8) VERIFY THE SIMILARITY BETWEEN TWO FACES

router.post('/verify', (req, res, next) => {
// router.post('/verify', checkAuth, (req, res, next) => {

    axios.defaults.headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": process.env.subscriptionKEY
    };

    axios.post(process.env.uriBaseVerify, {
        "faceId1": req.body.faceId1,
        "faceId2": req.body.faceId2
    }).then(response => {
        console.log(process.env.uriBaseVerify);
        res.status(200).send(response.data)
    }).catch(err => {
        res.json({
            error: err.response.data.error
        })
    })
});

  
module.exports = router;