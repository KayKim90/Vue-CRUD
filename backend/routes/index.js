var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = router;

// 2019 05 26 수정버전
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


// 2019 05 21 수정버전
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : '< MySQL username >',
//   password : '< MySQL password >',
//   port     : < port >,
//   database : 'my_db'
// });

// connection.connect();

// connection.query('SELECT * from Persons', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.', err);
// });

// connection.end();