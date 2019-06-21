var express = require('express');
var router = express.Router();

// SHOW LIST OF USERS
router.get('/', function(req, res) {
 req.getConnection(function(error, conn) {
   if(error) throw error;
   conn.query('SELECT * FROM Persons ORDER BY id DESC', function(err, rows) {
       if (err) {
          console.log('Here is err: ' + err);
          throw err;
         }
         console.log('The solution is: ', rows);
         res.send(rows);
     })
 })
})

// SHOW USER DETAILS
router.get('/:id', function (req, res) {
 req.getConnection(function(error, conn) {
     conn.query('SELECT * FROM Persons',function(err, detail_row) {
         if (err) throw error;          
         var id = parseInt(req.params.id, 10)  
         console.log(id)        
         var user_detail= detail_row.filter(function (_detail_row) {
           return _detail_row.id === id
         });
         res.send(user_detail);
     })
 })
})
// ADD NEW USER
router.post('/add', function(req, res){
    var user = [
        [req.body.id,
        req.body.name,
        req.body.age]
    ]
    console.log(user)
    req.getConnection(function(error, conn){
        if(!error){
            conn.query('INSERT INTO Persons (id, name, age) values ?', [user], function(err, result){
               if(!err){
                   console.log('success to add user')
                   res.send(result)
               } else {
                   console.log(err)
                   console.log('fail to add user')
               }            
            })
        } else {
            console.log(error)
        }

    })
})
//DELETE USER
router.delete('/delete/:id', function(req, res){
    var deletUser = parseInt(req.params.id, 10)
    console.log("Deleted row: " + deletUser)
    req.getConnection( function (error, conn) {
        conn.query('Delete From Persons Where id = ?', [deletUser], function(error, result){
            if(!error){
                console.log('deleted successfully');
                res.send(result)
            } else {
                console.log('delete failed')
            }
            
        })
    })
})
//EDIT USER
router.put('/edit/:id', function(req, res){
    var userID = parseInt(req.params.id, 10)
    var user = {
        name : req.body.name,
        age : req.body.age
    }
    req.getConnection( function (error, conn) {
        console.log('11111111111111111')
        conn.query('UPDATE Persons SET ? Where id = ' + userID, user, function(error, result){
            if(!error){
                console.log('Updated successfully');
                res.send(result)
            } else {
                console.log(error)
            }
            
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
