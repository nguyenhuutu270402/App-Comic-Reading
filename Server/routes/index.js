var express = require('express');
var router = express.Router();
var database = require('../components/database');
var controller = require('../components/controller');

/* GET home page. */







async function getData() {
  return new Promise((resolve, reject) => {
    database.query(`select * from nguoidung`, function (err, rs) {
      if (err) reject(err);
      resolve(rs);
    });
  });
}

router.get('/', async (req, res) => {
  try {
    const results = await getData();
    console.log('The solution is: ', results);
    res.render('index', { title: results[0].tennguoidung, data: results });
  } catch (err) {
    console.error(err);
    res.render('index', { title: results[0].tennguoidung, data: [] });
  }
});

router.put('/:id', function (req, res) {
  let id = req.params.id;
  let sql = `UPDATE db_test.user SET name = ? WHERE id = ${id}`;
  let data = [req.body.name];
  database.query(sql, data, function (error, results, fields) {
    if (error) throw error;
    console.debug("hda>>>>>>: ", results);
    res.send('User updated successfully.');
  });
});

router.post('/add', controller.addUser);

// http://localhost:3000/api/get-product-search?search=tênsảnphẩm
router.get("/search/", controller.search);

module.exports = router;
