'use strict';

require('dotenv').config({ path: './variables.env' });

const Item = require('../models/itemModel');

const factory = require('./handleFactory');


const AWS = require('aws-sdk'); 
var s3 = new AWS.S3();

module.exports.imageUpload = (event, context, callback) => {
     
    const base64File = JSON.parse(event.body);
    //const base64File = parsedBody.file;
    const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
        
     const params = {
        Bucket: "pratham-images",
        Key: `images/${new Date().toISOString()}.jpeg`,
        Body: decodedFile,
        ContentType: "image/jpeg",
    };

    console.log(params);
    s3.upload(params, function(err, data){
       if(err) {
           callback(err, null);
       } else {
           let response = {
        "statusCode": 200,
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
    console.log(response);
           callback(null, response);
    }
    });
    
};





