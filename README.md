#

# Azure-Face-API <br>
----
This API is hosted on Digital Ocean server and registered with name.com with the domain 'azurefaceapi.live'.
> This API calls Microsoft Azure Cognitive Services' Face API to perform operations of face detection, creating and adding to a face list and finding similar faces.
Appending respective endpoint URLs to the Base URL will cause the client to hit the appropriate API endpoint.


> Base URL: <br>
  azurefaceapi.live:3000/

## Face - Detect <br>
----

> Detect human faces in an image, return face rectangles, and optionally with faceIds, landmarks, and attributes. Will analyze the face in an image and return various features of the face. Choice of features to be returned is the user's choice. <br>
* The extracted face features are only stored on the server. Features are deleted after 24 hours after the original detection call. <br>
* Optional parameters include faceId, landmarks, and attributes. Attributes include age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure and noise. Some of the results returned for specific attributes may not be highly accurate. There are also various size and format constraints for the image which can be JPEG, PNG, GIF (the first frame), and BMP. <br>
* Different detection models can be used to detect faces: <br>
  * 'detection_01': Default detection model for Face-Detect.
  * 'detection_02': Newer model, better accuracy. Face attributes and landmarks are disabled if you choose this detection      model. 
* Different recognition models can be used. Specifying recognition model is required for some follow-up operations like face verification, face identification and similar faces: <br>
  * 'recognition_01:' Defualt recognition model for Face-Detect. Once specified, detected faces are specified with a recognition model.<br>

_Note: It is advised to use 'detection_01' and 'recognition_01' so that all features will work_

* **Method:**
  
    `POST`
    
* **URL**

  /detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes][&recognitionModel][&returnRecognitionModel][&detectionModel]
  
*  **URL Params**

    **Required:** 
    
       None
       
    **Optional:**
      
      Paramter | Description
      ------------ | -------------
      `returnFaceId=[boolean]`  |  Return faceIds of the detected faces or not. The default value is true.
      `returnFaceLandmarks=[boolean]`  |  Return face landmarks of the detected faces or not. The default value is false.
      `returnFaceAttributes=[string]`  |  Analyze and return the one or more specified face attributes in the comma-separated string like "returnFaceAttributes=age,gender". Supported face attributes include age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure and noise. Face attribute analysis has additional computational and time cost.
      `recognitionModel=[string]`  |  The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include "recognition_01" or "recognition_02". The default value is "recognition_01". 
      `returnRecognitionModel=[boolean]`  |  Return 'recognitionModel' or not. The default value is false.
      `detectionModel=[string]`  |  The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include "detection_01" or "detection_02". The default value is "detection_01".
      
* **Request Headers**

  Name | Type | Description
  ------------ | ------------- | -------------
  Content-Type | string |  Media type of the body sent to the API. 
  Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
  
* **Request body**

  Field | Type | Description
  ------------ | ------------- | -------------
  url | string | URL of the input image
  
  
  ```
    {
      "url": "www.test.com/1.jpg"
    }
  ```
  
  
* **Response**

     **Code: 200**
```
          
[
    {
        "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
        "recognitionModel": "recognition_02",
        "faceRectangle": {
            "width": 78,
            "height": 78,
            "left": 394,
            "top": 54
        },
        "faceLandmarks": {
            "pupilLeft": {
                "x": 412.7,
                "y": 78.4
            },
            "pupilRight": {
                "x": 446.8,
                "y": 74.2
            },
            "noseTip": {
                "x": 437.7,
                "y": 92.4
            },
            "mouthLeft": {
                "x": 417.8,
                "y": 114.4
            },
            "mouthRight": {
                "x": 451.3,
                "y": 109.3
            },
            "eyebrowLeftOuter": {
                "x": 397.9,
                "y": 78.5
            },
            "eyebrowLeftInner": {
                "x": 425.4,
                "y": 70.5
            },
            "eyeLeftOuter": {
                "x": 406.7,
                "y": 80.6
            },
            "eyeLeftTop": {
                "x": 412.2,
                "y": 76.2
            },
            "eyeLeftBottom": {
                "x": 413.0,
                "y": 80.1
            },
            "eyeLeftInner": {
                "x": 418.9,
                "y": 78.0
            },
            "eyebrowRightInner": {
                "x": 4.8,
                "y": 69.7
            },
            "eyebrowRightOuter": {
                "x": 5.5,
                "y": 68.5
            },
            "eyeRightInner": {
                "x": 441.5,
                "y": 75.0
            },
            "eyeRightTop": {
                "x": 446.4,
                "y": 71.7
            },
            "eyeRightBottom": {
                "x": 447.0,
                "y": 75.3
            },
            "eyeRightOuter": {
                "x": 451.7,
                "y": 73.4
            },
            "noseRootLeft": {
                "x": 428.0,
                "y": 77.1
            },
            "noseRootRight": {
                "x": 435.8,
                "y": 75.6
            },
            "noseLeftAlarTop": {
                "x": 428.3,
                "y": 89.7
            },
            "noseRightAlarTop": {
                "x": 442.2,
                "y": 87.0
            },
            "noseLeftAlarOutTip": {
                "x": 424.3,
                "y": 96.4
            },
            "noseRightAlarOutTip": {
                "x": 446.6,
                "y": 92.5
            },
            "upperLipTop": {
                "x": 437.6,
                "y": 105.9
            },
            "upperLipBottom": {
                "x": 437.6,
                "y": 108.2
            },
            "underLipTop": {
                "x": 436.8,
                "y": 111.4
            },
            "underLipBottom": {
                "x": 437.3,
                "y": 114.5
            }
        },
        "faceAttributes": {
            "age": 71.0,
            "gender": "male",
            "smile": 0.88,
            "facialHair": {
                "moustache": 0.8,
                "beard": 0.1,
                "sideburns": 0.02
            },
            "glasses": "sunglasses",
            "headPose": {
                "roll": 2.1,
                "yaw": 3,
                "pitch": 1.6
            },
            "emotion": {
                "anger": 0.575,
                "contempt": 0,
                "disgust": 0.006,
                "fear": 0.008,
                "happiness": 0.394,
                "neutral": 0.013,
                "sadness": 0,
                "surprise": 0.004
            },
            "hair": {
                "bald": 0.0,
                "invisible": false,
                "hairColor": [
                    {"color": "brown", "confidence": 1.0},
                    {"color": "blond", "confidence": 0.88},
                    {"color": "black", "confidence": 0.48},
                    {"color": "other", "confidence": 0.11},
                    {"color": "gray", "confidence": 0.07},
                    {"color": "red", "confidence": 0.03}
                ]
            },
            "makeup": {
                "eyeMakeup": true,
                "lipMakeup": false
            },
            "occlusion": {
                "foreheadOccluded": false,
                "eyeOccluded": false,
                "mouthOccluded": false
            },
            "accessories": [
                {"type": "headWear", "confidence": 0.99},
                {"type": "glasses", "confidence": 1.0},
                {"type": "mask"," confidence": 0.87}
            ],
            "blur": {
                "blurLevel": "Medium",
                "value": 0.51
            },
            "exposure": {
                "exposureLevel": "GoodExposure",
                "value": 0.55
            },
            "noise": {
                "noiseLevel": "Low",
                "value": 0.12
            }
        }
    }
 ]
```

## Face - Verify  <br>
---

> Verify whether two faces belong to a same person or whether one face belongs to a person. 


* **Method:**
  
    `POST`

* **URL**
     /verify

       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Content-Type | string |  Media type of the body sent to the API. 
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
       
* **Request Body**

    Name | Type | Description
    ------------ | ------------- | -------------
    faceId1 | string | faceId of one face, comes from Face - Detect.
    faceId2 | string | faceId of another face, comes from Face - Detect.

    
    ```
    {
    "faceId1": "c5c24a82-6845-4031-9d5d-978df9175426",
    "faceId2": "815df99c-598f-4926-930a-a734b3fd651c"
    }
    ```
    
       
* **Response**
  **Code: 200**
  
  ```
    {
    "isIdentical": true,
    "confidence": 0.9
    }
  ```
  
## Face - Find similar  <br>
---

> FIND SIMILARITY BETWEEN A DETECTED FACE AND FACES INSIDE A FACELIST WITH SIMILARITY SCORE


* **Method:**
  
    `GET`

* **URL **
     /similars

       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Content-Type | string |  Media type of the body sent to the API. 
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
       
* **Request Body**

    Name | Type | Description
    ------------ | ------------- | -------------
    faceId | string | faceId of the query face. User needs to call Face - Detect first to get a valid faceId. Note that this faceId is not persisted and will expire 24 hours after the detection call.
    faceListId | string |  	An existing user-specified unique candidate face list, created in FaceList - Create. Face list contains a set of persistedFaceIds which are persisted and will never expire. Parameter faceListId, largeFaceListId and faceIds should not be provided at the same time.
    faceIds | Array | An array of candidate faceIds. All of them are created by Face - Detect and the faceIds will expire 24 hours after the detection call.
    
    ```
      {
	  "faceId":"465f3318-e45d-4dda-aef1-1c98d35aeef0",
	  "faceListId":"sample_name"
    }
    ```
    
       
* **Response**
  **Code: 200**
  
  ```


  [
    {
        "persistedFaceId" : "015839fb-fbd9-4f79-ace9-7675fc2f1dd9",
        "confidence" : 0.82
    },
    ...
  ]


  ```
  

## Facelist - create empty <br>
---

> Create an empty face list with user-specified faceListId, name, an optional userData and recognitionModel.
* Face list is a list of faces, up to 1,000 faces, and used by Face - Find Similar.
* After creation, user should use FaceList - Add Face to import the faces. No image will be stored. Only the extracted face feature(s) will be stored on server until FaceList - Delete is called. 
*'recognitionModel' should be specified to associate with this face list. The default value for 'recognitionModel' is                                   'recognition_01', if the latest model needed, please explicitly specify the model you need in this parameter. New faces that are added to an existing face list will use the recognition model that's already associated with the collection. Existing face feature(s) in a face list can't be updated to features extracted by another version of recognition model.
  * recognition_01': The default recognition model for FaceList- Create. All those face lists created before 2019 March are bonded with this recognition model.
  * recognition_02': Recognition model released in 2019 March.
  
_Note: It is advised to use 'detection_01' and 'recognition_01' so that all features will work_


* **Method:**
  
    `PUT`

* **URL**
     /facelists/{facelistId}
  
*  **URL Params**

    **Required:** 
    
      Paramter | Type | Description
      ------------ | ------------- | -------------
      facelistId | string | Valid character is letter in lower case or digit or '-' or '_', maximum length is 64.
       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Content-Type | string |  Media type of the body sent to the API. 
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
* **Request body**

  Field | Type | Description
  ------------ | ------------- | -------------
  name | string | Name of the created face list, maximum length is 128.
  userData (optional) | string | Optional user defined data for the face list. Length should not exceed 16KB.
  recognitionModel (optional) | string | The 'recognitionModel' associated with this face list. Supported 'recognitionModel' values include "recognition_01" and "recognition_02". The default value is "recognition_01".
  
  
  ```
  {
    "name": "sample_list",
    "userData": "User-provided data attached to the face list.",
    "recognitionModel": "recognition_01"
  }
  ```

* **Response**
  **Code: 200**
  
  ```
    {
    "message": "Face list successfully created.",
    "faceListId": "{facelistname}"
    }
    
    
  ```
  
## Facelist - Add face <br>
---

> Add a face to a specified face list, up to 1,000 faces. Note persistedFaceId is different from faceId generated by Face - Detect.


* **Method:**
  
    `POST`

* **URL**
     /facelists/{facelistId}/persistedFaces[?userData][&detectionModel]
  
*  **URL Params**
    
      Paramter | Type | Description
      ------------ | ------------- | -----------
      facelistId | string | Valid character is letter in lower case or digit or '-' or '_', maximum length is 64.
      userData (optional) | string | Optional user defined data for the face list. Length should not exceed 16KB.
      detectionnModel (optional) | string | The 'recognitionModel' associated with this face list. Supported 'detectionModel' values include "detecttion_01" and "detecttion_02". The default value is "detection_01".
       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Content-Type | string |  Media type of the body sent to the API. 
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
     detectionModel (optional) | string | The 'recognitionModel' associated with this face list. Supported 'detectionModel' values include "detecttion_01" and "detecttion_02". The default value is "detection_01".
       
* **Request body**

  Field | Type | Description
  ------------ | ------------- | -------------
  url | string | URL of the input image
  
  
  ```
    {
      "url": "www.test.com/1.jpg"
    }
  ```

* **Response**
  **Code: 200**
  
  ```
    {
    "persistedFaceId": "B8D802CF-DD8F-4E61-B15C-9E6C5844CCBA"
    }
  ```
  
  
## Facelist - Get  <br>
---

> Retrieve a face list’s faceListId, name, userData, recognitionModel and faces in the face list. 


* **Method:**
  
    `GET`

* **URL**
     /facelists/{facelistId}[?returnRecognitionModel]
  
*  **URL Params**
    
      Paramter | Type | Description
      ------------ | ------------- | -----------
      facelistId | string | Valid character is letter in lower case or digit or '-' or '_', maximum length is 64.
      returnRecognitionModel (optional) | boolean | Return 'recognitionModel' or not. The default value is false.

      
       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
       
* **Response**
  **Code: 200**
    A successful call returns the face list's information. 
  
  ```
    {
    "faceListId": "sample_list",
    "name": "list1",
    "userData": "User-provided data attached to the face list.",
    "recognitionModel": "recognition_02",
    "persistedFaces": [
       {
          "persistedFaceId": "B8D802CF-DD8F-4E61-B15C-9E6C5844CCBD",
          "userData": "User-provided data attached to the face."
       },
       …
       ]
    }
  ```
  

  
  
## Facelist - List  <br>
---

> List face lists’ faceListId, name, userData and recognitionModel.
To get face information inside faceList use FaceList - Get. 


* **Method:**
  
    `GET`

* **URL**
     /facelists[?returnRecognitionModel]
  
*  **URL Params**
    
      Paramter | Type | Description
      ------------ | ------------- | -----------
      returnRecognitionModel (optional) | boolean | Return 'recognitionModel' or not. The default value is false.

      
       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
       
* **Response**
  **Code: 200**
  A successful call returns an array of faceList. 
  
  ```
    [
      {
       "faceListId": "sample_list",
       "name": "list1",
       "userData": "User-provided data attached to the face list.",
       "recognitionModel": "recognition_01"
      },
      …
    ]
  ```
  
## Facelist - Delete  <br>
---

> Delete a specified face list. 


* **Method:**
  
    `DELETE`

* **URL**
     /facelists/{facelistId}
  
*  **URL Params**
    
      Paramter | Type | Description
      ------------ | ------------- | -----------
      facelistId | string | Valid character is letter in lower case or digit or '-' or '_', maximum length is 64.
      
       
* **Request Headers**

     Name | Type | Description
     ------------ | ------------- | -------------
     Ocp-Apim-Subscription-Key | string | Subscription key which provides access to this API.
       
       
* **Response**
  **Code: 200**
    A successful call returns a 'delete successful' message.
    
  
  ```
    {
    "message": "Deleted facelist succesfully!"
    }
  ```
  
  For a complete API reference of Microsoft Azure Face, please visit [official documentation](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236)
  
  

  
  
  
  
  
  
  
  
  

  
