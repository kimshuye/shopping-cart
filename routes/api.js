var express = require('express');
var router = express.Router();
var firebase = require('firebase');

firebase.initializeApp({
    serviceAccount: "./test-cee590a82269.json",
    databaseURL: "https://test-4cdf0.firebaseio.com/"
});


var db = firebase.database();
var ref = db.ref("shopping");
var techRef = db.ref("shopping/list");

var firebaseData = {};

ref.on("value",function(snapshot){
    firebaseData = snapshot.val();    
},function(errorObject){
    console.log("The read failed: " + errorObject.code );
});

/* GET /api/v1/shopping */ 
router.get('/shopping',function(req, res){
    res.send(firebaseData);
});

/* GET /api/v1/shopping/list */ 
router.get('/shopping/list',function(req, res){
    res.send(firebaseData['list']);
});

/* POST /api/v1/shopping/list */
router.post('/shopping/list',function(req, res){
    if(!req.body) return res.send.sendStatus(400);
    for(var key in req.body) {
        techRef.child(key).set(req.body[key],function(error) {
            if(error){
                console.log("shopping could not be saved. " + error);
            } else {
                console.log("shopping saved successfully. ");
            }
        });
    }
    res.sendStatus(200);
});

module.exports = router;
