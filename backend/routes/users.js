var express = require('express');
var router = express.Router();

// SHOW LIST OF USERS
router.get('/', function(req, res, next) {
 req.getConnection(function(error, conn) {
   if(error) throw error;
   conn.query('SELECT * FROM Persons ORDER BY id DESC', function(err, rows, fields) {
       if (err) {
          console.log('Here is err: '+err);
          throw err;
         }
         console.log('The solution is: ', rows);
         res.send(rows);
     })
 })
})

// SHOW USER Detail
router.get('/:id', function (req, res, next) {
 req.getConnection(function(error, conn) {
     conn.query('SELECT * FROM Persons',function(err, detail_row, fields) {
         //if(err) throw err
         if (err) throw err;          
         var id = parseInt(req.params.id, 10)          
         var user_detail= detail_row.filter(function (_detail_row) {
           return _detail_row.id === id
         });
         res.send(user_detail);
     })
 })
})

module.exports = router;


// 에러 원인
// ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server;



// var express = require('express');
// var router = express.Router();
// // var user = require('../users.json');

// router.get('/', function (req, res, next){
//   req.getConnection(function(error, conn){
//     console.log('4')
//     conn.query('SELECT * FROM Persons ORDER BY id DESC', function(err, rows, fields){
//       console.log('5')
//       //if(err) throws err
//       if(err) throw err;
//       console.log('The solution is: ', rows);
//       res.send(rows);
//     })
//   })
// });
// module.exports = router;


// Default
// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
