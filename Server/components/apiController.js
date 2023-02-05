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
                    res.status(200).json(results[0]);
                } else {
                    res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
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


}

module.exports = apiController;