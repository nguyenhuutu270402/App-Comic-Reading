var database = require('../components/database');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const controller = {

    loginAdmin: async (req, res) => {
        try {
            const { email, matkhau } = req.body;
            database.query("SELECT * FROM nguoidung WHERE email = ? AND phanquyen = 0", [email], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {

                    const result = results[0];
                    if (result) {
                        if (result.matkhau === matkhau) {
                            const token = jwt.sign({ id: result.id, email: result.email }, process.env.APP_SECRET, { expiresIn: '1h' })
                            req.session.token = token;
                            global.idNguoiDung = result.id;
                            res.json({
                                success: true
                            });
                        } else {
                            res.json({
                                success: false,
                                message: 'Tài khoản hoặc mật khẩu không đúng',
                            });
                        }
                    } else {
                        res.json({
                            success: false,
                            message: 'Tài khoản hoặc mật khẩu không đúng',
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: 'Tài khoản hoặc mật khẩu không đúng',
                    });
                }

            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getTruyen: async (req, res) => {
        try {
            let user = {};
            let listTruyen = [];

            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                }
            });

            var qr = "SELECT truyen.*, COUNT(DISTINCT luotxem.id) AS 'tongluotxem', COUNT(DISTINCT theodoi.id) AS 'tongtheodoi', COUNT(DISTINCT danhgia.id) AS 'tongdanhgia', AVG(danhgia.sosao)'sosaotrungbinh', MAX(chuong.ngaycapnhat) AS ngaycapnhat, MAX(chuong.sochuong) AS chuongmoinhat FROM truyen INNER JOIN chuong ON truyen.id = chuong.idtruyen LEFT JOIN luotxem ON chuong.id = luotxem.idchuong LEFT JOIN theodoi ON truyen.id = theodoi.idtruyen LEFT JOIN danhgia ON truyen.id = danhgia.idtruyen GROUP BY truyen.id ORDER BY MAX(chuong.ngaycapnhat) DESC";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTruyen = results;
                    console.log("user> ", user);
                    console.log("list> ", listTruyen);
                    res.render('index', { user: user, listTruyen: listTruyen });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTheLoai: async (req, res) => {
        try {
            let user = {};
            let listTheLoai = [];

            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                }
            });

            var qr = "select * from theloai";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTheLoai = results;
                    console.log("user> ", user);
                    console.log("list> ", listTheLoai);
                    res.render('theloai', { user: user, listTheLoai: listTheLoai });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getNguoiDung: async (req, res) => {
        try {
            let user = {};
            let listNguoiDung = [];

            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                }
            });

            var qr = "select * from nguoidung";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listNguoiDung = results;
                    console.log("user> ", user);
                    console.log("list> ", listNguoiDung);
                    res.render('nguoidung', { user: user, listNguoiDung: listNguoiDung });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTacGia: async (req, res) => {
        try {
            let user = {};
            let listTacGia = [];

            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                }
            });

            var qr = "select * from tacgia";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTacGia = results;
                    console.log("user> ", user);
                    console.log("list> ", listTacGia);
                    res.render('tacgia', { user: user, listTacGia: listTacGia });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

};
module.exports = controller;