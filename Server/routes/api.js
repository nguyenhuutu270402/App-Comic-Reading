var express = require('express');
var router = express.Router();
var apiController = require('../components/apiController');


// http://localhost:3000/api/

router.post('/add-user', apiController.addUser);

router.post('/login', apiController.loginUser);

router.post('/check-register', apiController.checkRegister);

router.get('/get-all-truyen', apiController.getAllTruyen);

router.get('/get-top10-truyen', apiController.getTop10Truyen);

router.get('/get-one-truyen-by-id/:id', apiController.getOneTruyenById);

router.get('/search-truyen', apiController.searchTruyen); // /search-truyen?search=naa

router.get('/get-3chuong-theo-id-truyen/:idTruyen', apiController.get3Chuong);

router.get('/get-list-chuong-theo-id-truyen/:idTruyen', apiController.getListChuongByIdTruyen);

router.get('/get-list-the-loai-theo-id-truyen/:idTruyen', apiController.getListTheLoaiByIdTruyen);

router.get('/get-list-tac-gia-theo-id-truyen/:idTruyen', apiController.getListTacGiaByIdTruyen);

router.post('/add-theo-doi', apiController.addTheoDoi);

router.post('/kiem-tra-theo-doi', apiController.kiemTraTheoDoi);

router.post('/delete-theo-doi', apiController.deleteTheoDoi);

router.post('/add-danh-gia', apiController.addDanhGia);

router.post('/add-luot-xem', apiController.addLuotXem);

router.post('/kiem-tra-danh-gia', apiController.kiemTraDanhGia);

router.post('/update-danh-gia', apiController.updateDanhGia);

router.get('/get-get-list-image-chuong-theo-id-chuong/:idChuong', apiController.getListImageChuongByIdChuong);

router.get('/get-one-chuong-theo-id-chuong/:id', apiController.getOneChuongById);

router.post('/add-binh-luan', apiController.addBinhLuan);

router.get('/get-list-binh-luan-theo-id-truyen/:idTruyen', apiController.getListBinhLuanByIdTruyen);

router.get('/get-tong-binh-luan-theo-id-truyen/:idTruyen', apiController.getTongBinhLuanByIdTruyen);

router.post('/lay-list-truyen-theo-loai', apiController.layListTruyenTheoLoai);

module.exports = router;
