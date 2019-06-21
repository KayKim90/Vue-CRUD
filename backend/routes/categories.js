var express = require('express');
var router = express.Router();

// Show all list of categories
router.get('/', function(req, res, next) {
 req.getConnection(function(error, conn) {
   if(error) throw error;
   conn.query('select * from category order by code;', function(err, rows, fields) {
       if (err) {
          console.log('Here is err: ' + err);
          throw err;
         }
         console.log('Showing product data works');
        //  console.log('The solution is:\n', rows);
         res.send(rows);
     })
 })
})

module.exports = router;
