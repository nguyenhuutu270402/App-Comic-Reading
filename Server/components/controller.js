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

            var qr = "SELECT truyen.* from truyen";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTruyen = results;
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
                    res.render('tacgia', { user: user, listTacGia: listTacGia });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAddTacGia: async (req, res) => {
        try {
            let user = {};
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('addtacgia', { user: user });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postAddTacGia: async (req, res) => {
        try {
            const { tentacgia } = req.body;
            database.query("INSERT INTO tacgia (tentacgia) VALUES (?)", [tentacgia], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.redirect('/tac-gia');
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUpdateTacGia: async (req, res) => {
        try {
            let user = {};
            let tacgia = {};
            database.query("SELECT id, tentacgia FROM tacgia WHERE id = ?", req.params.id, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    tacgia = results[0];
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('updatetacgia', { user: user, tacgia: tacgia });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postUpdateTacGia: async (req, res) => {
        try {
            const { tentacgia, id } = req.body;
            database.query("UPDATE tacgia SET tentacgia = ? WHERE id = ?", [tentacgia, id], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.redirect('/tac-gia');
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAddTheLoai: async (req, res) => {
        try {
            let user = {};
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('addtheloai', { user: user });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postAddTheLoai: async (req, res) => {
        try {
            const { tentheloai, mota } = req.body;
            database.query("INSERT INTO theloai (tentheloai, mota) VALUES (? , ?)", [tentheloai, mota], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.redirect('/the-loai');
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUpdateTheLoai: async (req, res) => {
        try {
            let user = {};
            let theloai = {};
            database.query("SELECT id, tentheloai, mota FROM theloai WHERE id = ?", req.params.id, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    theloai = results[0];
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('updatetheloai', { user: user, theloai: theloai });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postUpdateTheLoai: async (req, res) => {
        try {
            const { tentheloai, mota, id } = req.body;
            database.query("UPDATE theloai SET tentheloai = ? , mota = ? WHERE id = ?", [tentheloai, mota, id], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.redirect('/the-loai');
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAddTruyen: async (req, res) => {
        try {
            let user = {};
            let listTacGia = [];
            let listTheLoai = [];

            var qr1 = "SELECT * from tacgia order by tentacgia";
            database.query(qr1, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTacGia = results;
                }
            });
            var qr2 = "SELECT * from theloai order by tentheloai;";
            database.query(qr2, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTheLoai = results;
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('addtruyen', { user: user, listTacGia: listTacGia, listTheLoai: listTheLoai });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUpdateTruyen: async (req, res) => {
        try {
            let user = {};
            let truyen = {};
            let listTacGia = [];
            let listTheLoai = [];
            let tinhtrangs = [
                {
                    "value": 1,
                    "option": "Đang tiến hành",
                    "selected": null
                },
                {
                    "value": 2,
                    "option": "Hoàn thành",
                    "selected": null
                },
                {
                    "value": 3,
                    "option": "Ngừng hoạt động",
                    "selected": null
                }
            ];
            const id = req.params.id;
            var qr0 = `SELECT * from truyen where id = ${id}`
            database.query(qr0, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    truyen = results[0];
                    for (let i = 0; i < tinhtrangs.length; i++) {
                        if (tinhtrangs[i].value === results[0].tinhtrang) {
                            tinhtrangs[i].selected = true;
                        }
                    }
                }
            });

            var qr1 = `SELECT theloai.*, ct_theloai.idtruyen as checktheloai
                        FROM theloai
                        LEFT JOIN ct_theloai ON theloai.id = ct_theloai.idtheloai AND ct_theloai.idtruyen = ${id}
                        group by theloai.id
                        order by theloai.tentheloai;`
            database.query(qr1, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTheLoai = results;
                }
            });
            var qr2 = `SELECT tacgia.*, ct_tacgia.idtruyen as checktacgia
                        FROM tacgia
                        LEFT JOIN ct_tacgia ON tacgia.id = ct_tacgia.idtacgia AND ct_tacgia.idtruyen = ${id}
                        group by tacgia.id
                        order by tacgia.tentacgia;`
            database.query(qr2, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    listTacGia = results;
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('updatetruyen', { user: user, listTacGia: listTacGia, listTheLoai: listTheLoai, truyen: truyen, tinhtrangs: tinhtrangs });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getChuong: async (req, res) => {
        try {
            let listChuong = [];
            let user = {};

            database.query(`SELECT chuong.*, truyen.tentruyen FROM chuong 
                        LEFT JOIN truyen ON chuong.idtruyen = truyen.id
                        WHERE idtruyen = ? order by chuong.sochuong desc`, [req.params.idTruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    listChuong = results;
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('chuong', { user: user, listChuong: listChuong, idTruyen: req.params.idTruyen });
                }
            });

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAddChuong: async (req, res) => {
        try {
            let user = {};

            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('addchuong', { user: user, idTruyen: req.params.idTruyen });
                }
            });

        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUpdateChuong: async (req, res) => {
        try {
            let user = {};
            let chuong = {};
            database.query("SELECT * FROM chuong WHERE id = ?", req.params.idChuong, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    chuong = results[0];
                }
            });
            database.query("SELECT id, email, tennguoidung, avatar FROM nguoidung WHERE id = ?", [global.idNguoiDung], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    user = results[0];
                    res.render('updatechuong', { user: user, chuong: chuong });
                }
            });

        } catch (error) {
            res.status(500).json(error);
        }
    },
};
module.exports = controller;