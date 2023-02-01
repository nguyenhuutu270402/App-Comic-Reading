var database = require('../components/database');

const controller = {

    addUser: async (req, res) => {
        try {
            const newData = { name: req.body.name };
            database.query("INSERT INTO db_test.user SET ?", newData, (err, results) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(200).json({ insertId: results.insertId });
                }
            }
            );
        } catch (error) {
            res.status(500).json(error);
        }
    },

    search: async (req, res) => {
        // try {
        var search = req.query.search;
        var search2 = search.split(" ").join("");
        var searchArray = search2.split("");
        var query = `SELECT * FROM db_test.user WHERE name LIKE '%${searchArray[0]}%'`;
        for (let index = 1; index < searchArray.length; index++) {
            const element = searchArray[index];
            query = query + ` AND name LIKE '%${element}%'`
        }

        database.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ results });
            }
        }
        );
    },



};
module.exports = controller;