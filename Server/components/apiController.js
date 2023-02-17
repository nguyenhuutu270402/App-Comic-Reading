var database = require('../components/database');

const apiController = {

    addUser: async (req, res) => {
        try {
            const { email, matkhau } = req.body;
            database.query("INSERT INTO nguoidung (email, matkhau, tennguoidung, phanquyen) VALUES (?, ?, '', '1')", [email, matkhau], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, matkhau } = req.body;
            database.query("SELECT * FROM nguoidung WHERE email = ? AND matkhau = ?", [email, matkhau], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    res.status(200).json({ results: results[0] });
                } else {
                    res.status(200).json({ results: false });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    checkRegister: async (req, res) => {
        try {
            const { email } = req.body;
            database.query("SELECT * FROM nguoidung WHERE email = ?", [email], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    res.status(200).json({ results: false });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { tennguoidung, avatar, id } = req.body;
            database.query("UPDATE nguoidung SET tennguoidung = ?, avatar = ? WHERE id = ?", [tennguoidung, avatar, id], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updatePasswordUser: async (req, res) => {
        try {
            const { matkhau, id } = req.body;
            database.query("UPDATE nguoidung SET matkhau = ? WHERE id = ?", [matkhau, id], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllTruyen: async (req, res) => {
        try {
            var qr = "SELECT truyen.*, COUNT(DISTINCT luotxem.id) AS 'tongluotxem', COUNT(DISTINCT theodoi.id) AS 'tongtheodoi', COUNT(DISTINCT danhgia.id) AS 'tongdanhgia', AVG(danhgia.sosao)'sosaotrungbinh', MAX(chuong.ngaycapnhat) AS ngaycapnhat, MAX(chuong.sochuong) AS chuongmoinhat FROM truyen INNER JOIN chuong ON truyen.id = chuong.idtruyen LEFT JOIN luotxem ON chuong.id = luotxem.idchuong LEFT JOIN theodoi ON truyen.id = theodoi.idtruyen LEFT JOIN danhgia ON truyen.id = danhgia.idtruyen GROUP BY truyen.id ORDER BY MAX(chuong.ngaycapnhat) DESC";
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTop10Truyen: async (req, res) => {
        try {
            // var qr = "select * from truyen"
            var qr = "SELECT truyen.*, COUNT(DISTINCT luotxem.id) AS 'tongluotxem', COUNT(DISTINCT theodoi.id) AS 'tongtheodoi',COUNT(DISTINCT danhgia.id) AS 'tongdanhgia',AVG(danhgia.sosao)'sosaotrungbinh', MAX(chuong.ngaycapnhat) AS ngaycapnhat, MAX(chuong.sochuong) AS chuongmoinhat FROM truyen INNER JOIN chuong ON truyen.id = chuong.idtruyen LEFT JOIN luotxem ON chuong.id = luotxem.idchuong LEFT JOIN theodoi ON truyen.id = theodoi.idtruyen LEFT JOIN danhgia ON truyen.id = danhgia.idtruyen GROUP BY truyen.id ORDER BY COUNT(DISTINCT luotxem.id) DESC LIMIT 10"
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },


    searchTruyen: async (req, res) => {
        try {
            var search = req.query.search;
            var searchArray = search.split(" ");
            console.log(searchArray);
            var query = `SELECT * FROM truyen WHERE concat(tentruyen, '', tenkhac) LIKE '%${searchArray[0]}%'`;
            for (let index = 1; index < searchArray.length; index++) {
                const element = searchArray[index];
                query = query + ` AND concat(tentruyen, '', tenkhac) LIKE '%${element}%'`
            }

            database.query(query, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results });
                }
            }
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },


    get3Chuong: async (req, res) => {
        try {
            var id = req.params.idTruyen;
            var qr = `SELECT * FROM chuong WHERE idtruyen = ${id} ORDER BY chuong.sochuong desc LIMIT 3`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOneTruyenById: async (req, res) => {
        try {
            var id = req.params.id;
            var qr = `SELECT truyen.*, COUNT(DISTINCT luotxem.id) AS 'tongluotxem', COUNT(DISTINCT theodoi.id) AS 'tongtheodoi', COUNT(DISTINCT danhgia.id) AS 'tongdanhgia', COUNT(DISTINCT binhluan.id) AS 'tongbinhluan', AVG(danhgia.sosao)'sosaotrungbinh', MAX(chuong.ngaycapnhat) AS ngaycapnhat, MAX(chuong.sochuong) AS chuongmoinhat FROM truyen INNER JOIN chuong ON truyen.id = chuong.idtruyen LEFT JOIN luotxem ON chuong.id = luotxem.idchuong LEFT JOIN theodoi ON truyen.id = theodoi.idtruyen LEFT JOIN danhgia ON truyen.id = danhgia.idtruyen LEFT JOIN binhluan ON truyen.id = binhluan.idtruyen where truyen.id = ${id} GROUP BY truyen.id ORDER BY MAX(chuong.ngaycapnhat) DESC`;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results[0] });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListChuongByIdTruyen: async (req, res) => {

        try {
            var idTruyen = req.params.idTruyen;
            var idNguoiDung = req.params.idNguoiDung;
            var qr = `
            SELECT chuong.*, lichsuxemchuong.idnguoidung as idnguoidung_da_doc, COUNT(DISTINCT luotxem.id) AS tongsoluot
            FROM chuong
            LEFT JOIN luotxem ON chuong.id = luotxem.idchuong
            LEFT JOIN lichsuxemchuong ON chuong.id = lichsuxemchuong.idchuong AND lichsuxemchuong.idnguoidung = ${idNguoiDung}
            WHERE chuong.idtruyen = ${idTruyen}
            group by chuong.id
            order by chuong.sochuong desc;`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListTheLoaiByIdTruyen: async (req, res) => {
        try {
            var id = req.params.idTruyen;
            var qr = `SELECT theloai.* FROM theloai LEFT JOIN ct_theloai ON theloai.id = ct_theloai.idtheloai LEFT JOIN truyen ON ct_theloai.idtruyen = truyen.id WHERE ct_theloai.idtruyen = ${id} GROUP BY ct_theloai.id ORDER BY theloai.tentheloai;`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListTacGiaByIdTruyen: async (req, res) => {
        try {
            var id = req.params.idTruyen;
            var qr = `SELECT tacgia.* FROM tacgia LEFT JOIN ct_tacgia ON tacgia.id = ct_tacgia.idtacgia LEFT JOIN truyen ON ct_tacgia.idtruyen = truyen.id where ct_tacgia.idtruyen = ${id} GROUP BY ct_tacgia.id  ORDER BY tacgia.tentacgia;`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addTheoDoi: async (req, res) => {
        try {
            const { idnguoidung, idtruyen } = req.body;
            database.query("INSERT INTO theodoi (idnguoidung, idtruyen) VALUES (?, ?)", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    kiemTraTheoDoi: async (req, res) => {
        try {
            const { idnguoidung, idtruyen } = req.body;
            database.query("SELECT * FROM theodoi WHERE idnguoidung = ? AND idtruyen = ?", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    res.status(200).json({ results: true });
                } else {
                    res.status(200).json({ results: false });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteTheoDoi: async (req, res) => {
        try {
            const { idnguoidung, idtruyen } = req.body;
            database.query("DELETE FROM theodoi WHERE idnguoidung = ? AND idtruyen = ?", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addDanhGia: async (req, res) => {
        try {
            const { idnguoidung, idtruyen, sosao } = req.body;
            database.query("INSERT INTO danhgia (idnguoidung, idtruyen, sosao) VALUES (?, ?, ?)", [idnguoidung, idtruyen, sosao], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addLuotXem: async (req, res) => {
        try {
            const { idnguoidung, idchuong, ngayxem } = req.body;
            database.query("INSERT INTO luotxem (idnguoidung, idchuong, ngayxem) VALUES (?, ?, ?)", [idnguoidung, idchuong, ngayxem], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    kiemTraDanhGia: async (req, res) => {
        try {
            const { idnguoidung, idtruyen } = req.body;
            database.query("SELECT * FROM danhgia WHERE idnguoidung = ? AND idtruyen = ?", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    res.status(200).json({ results: true, danhgia: results[0] });
                } else {
                    res.status(200).json({ results: false });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateDanhGia: async (req, res) => {
        try {
            const { idnguoidung, idtruyen, sosao } = req.body;
            database.query("UPDATE danhgia SET sosao = ? WHERE idnguoidung = ? AND idtruyen = ?", [sosao, idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListImageChuongByIdChuong: async (req, res) => {
        try {
            var id = req.params.idChuong;
            var qr = `select * from image_chuong where idchuong = ${id}`;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOneChuongById: async (req, res) => {
        try {
            var id = req.params.id;
            var qr = `SELECT chuong.*, COUNT(DISTINCT luotxem.id) AS tongsoluot FROM chuong left JOIN luotxem ON chuong.id = luotxem.idchuong WHERE chuong.id = ${id} GROUP BY chuong.id ORDER BY chuong.sochuong desc`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results[0] });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListBinhLuanByIdTruyen: async (req, res) => {
        try {
            var idTruyen = req.params.idTruyen;
            var qr = `SELECT binhluan.*, nguoidung.tennguoidung, nguoidung.avatar FROM binhluan left JOIN truyen ON binhluan.idtruyen = truyen.id left JOIN nguoidung ON binhluan.idnguoidung = nguoidung.id where idtruyen = ${idTruyen} ORDER BY binhluan.ngaybinhluan DESC;
            `;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addBinhLuan: async (req, res) => {
        try {
            const { idnguoidung, idtruyen, noidung, ngaybinhluan } = req.body;
            database.query("INSERT INTO binhluan (idnguoidung, idtruyen, noidung, ngaybinhluan) VALUES (?, ?, ?, ?)", [idnguoidung, idtruyen, noidung, ngaybinhluan], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTongBinhLuanByIdTruyen: async (req, res) => {
        try {
            var idTruyen = req.params.idTruyen;
            var qr = `select COUNT(DISTINCT binhluan.id) AS 'tongbinhluan' from binhluan where binhluan.idtruyen = ${idTruyen};`
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results[0].tongbinhluan });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },


    layListTruyenTheoLoai: async (req, res) => {
        try {
            const { lastquery } = req.body;
            var qr = `SELECT truyen.id,
            truyen.tentruyen,
            truyen.imagelink, 
            truyen.mota, 
                COUNT(DISTINCT luotxem.id) AS 'tongluotxem', 
                COUNT(DISTINCT theodoi.id) AS 'tongtheodoi',
                COUNT(DISTINCT danhgia.id) AS 'tongdanhgia',
                AVG(danhgia.sosao)'sosaotrungbinh',
                MAX(chuong.ngaycapnhat) AS ngaycapnhat,
                MAX(chuong.sochuong) AS chuongmoinhat
            FROM truyen
            INNER JOIN chuong ON truyen.id = chuong.idtruyen
            LEFT JOIN ct_theloai ON truyen.id = ct_theloai.idtruyen
            LEFT JOIN theloai ON ct_theloai.idtheloai = theloai.id
            LEFT JOIN ct_tacgia ON truyen.id = ct_tacgia.idtruyen
            LEFT JOIN tacgia ON ct_tacgia.idtacgia = tacgia.id
            LEFT JOIN luotxem ON chuong.id = luotxem.idchuong
            LEFT JOIN theodoi ON truyen.id = theodoi.idtruyen
            LEFT JOIN danhgia ON truyen.id = danhgia.idtruyen ` + lastquery;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListLichSuTheoIdNguoiDung: async (req, res) => {
        try {
            var idNguoiDung = req.params.idNguoiDung;
            var qr = `
            select truyen.*, max(chuong.sochuong) as sochuong
            from lichsu
            LEFT JOIN truyen ON lichsu.idtruyen = truyen.id
            LEFT JOIN chuong ON lichsu.idchuong = chuong.id
            where lichsu.idnguoidung = ${idNguoiDung}
            group by lichsu.idtruyen 
            order by max(lichsu.ngayxemgannhat) desc`;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getListTheLoai: async (req, res) => {
        try {
            var qr = `select * from theloai order by theloai.tentheloai`;
            database.query(qr, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: results });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },


    kiemTraLichSu: async (req, res) => {
        try {
            const { idnguoidung, idtruyen, idchuong, ngayxemgannhat } = req.body;
            database.query("SELECT * FROM lichsu WHERE idnguoidung = ? AND idtruyen = ?", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    database.query("UPDATE lichsu SET idchuong = ?, ngayxemgannhat = ? WHERE idnguoidung = ? AND idtruyen = ?", [idchuong, ngayxemgannhat, idnguoidung, idtruyen], (err, results) => {
                        if (err) {
                            res.status(500).json({ message: err.message });
                        } else {
                            res.status(200).json({ results: true });
                        }
                    });

                } else {
                    database.query("INSERT INTO lichsu (idnguoidung, idtruyen, idchuong, ngayxemgannhat) VALUES (?, ?, ?, ?)", [idnguoidung, idtruyen, idchuong, ngayxemgannhat], (err, results) => {
                        if (err) {
                            res.status(500).json({ message: err.message });
                        } else {
                            res.status(200).json({ insertId: results.insertId });
                        }
                    });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },


    kiemTraLichSuXemChuong: async (req, res) => {
        try {
            const { idnguoidung, idchuong } = req.body;
            database.query("SELECT * FROM lichsuxemchuong WHERE idnguoidung = ? AND idchuong = ?", [idnguoidung, idchuong], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else if (results.length > 0) {
                    res.status(200).json({ results: results });
                } else {
                    database.query("INSERT INTO lichsuxemchuong (idnguoidung, idchuong) VALUES (?, ?)", [idnguoidung, idchuong], (err, results) => {
                        if (err) {
                            res.status(500).json({ message: err.message });
                        } else {
                            res.status(200).json({ insertId: results.insertId });
                        }
                    });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteLichSu: async (req, res) => {
        try {
            const { idnguoidung, idtruyen } = req.body;
            database.query("DELETE FROM lichsu WHERE idnguoidung = ? AND idtruyen = ?", [idnguoidung, idtruyen], (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ results: true });
                }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = apiController;