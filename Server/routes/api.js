var express = require('express');
var router = express.Router();
var apiController = require('../components/apiController');


// http://localhost:3000/api/

router.post('/add-user', apiController.addUser);

router.post('/login', apiController.loginUser);

router.get('/get-all-truyen', apiController.getAllTruyen);

router.get('/get-top10-truyen', apiController.getTop10Truyen);

router.get('/search-truyen', apiController.searchTruyen); // /search-truyen?search=naa

router.get('/get-3chuong-theo-id-truyen/:idTruyen', apiController.get3Chuong);


module.exports = router;
