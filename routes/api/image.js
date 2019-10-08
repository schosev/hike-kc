// 'use strict';

// var aws = require('aws-sdk'); //require aws-sdk

// // var config = require('../../../config/config.json/' + process.env.NODE_ENV); // require you config file
// var config = require('../../config/config');

// var s3 = new aws.S3({ accessKeyId: config.s3.AWS_ID, secretAccessKey: config.s3.AWS_KEY }); //create a s3 Object with s3 User ID and Key

// //construct getParam
// var getParams = {
//     Bucket: 'hikekc',
//     Key: 'south-lake-1.jpeg'
// }

// //Fetch or read data from aws s3
// s3.getObject(getParams, function (err, data) {

//     if (err) {
//         console.log(err);
//     } else {
//         // console.log(data.Body.toString()); //this will log data to console
//     //     console.log(JSON.parse(data.Body.toString())); //this will log data to console
//     }

// })

module.exports = function (app) {
  //comment

}
