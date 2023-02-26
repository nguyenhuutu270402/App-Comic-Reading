var express = require('express');
var router = express.Router();
const controller = require('../components/controller');
const authentication = require('../middle/auth');
/* GET home page. */

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', controller.loginAdmin);

router.get('/logout', [authentication.checkLogin], function (req, res, next) {
  req.session.destroy(function (err) {
    // nếu đăng xuất thành công chuyển qua đăng nhập
    res.redirect('login');
  })
});

router.get('/', [authentication.checkLogin], controller.getTruyen);
router.get('/the-loai', [authentication.checkLogin], controller.getTheLoai);
router.get('/tac-gia', [authentication.checkLogin], controller.getTacGia);
router.get('/nguoi-dung', [authentication.checkLogin], controller.getNguoiDung);


module.exports = router;
