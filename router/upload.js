var express = require('express');
var router = express.Router();
var Upload= require('../controller/UploadController.js');


router.post('/singleUpload', Upload.singleUpload);


module.exports = router