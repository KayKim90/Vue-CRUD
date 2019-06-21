var express = require('express');
var router = express.Router();

// Show all list of supplier
router.get('/', function(req, res) {
 req.getConnection(function(error, conn) {
   if(error) throw error;
   conn.query('select*from supplier order by Supplier_ID;', function(err, rows, fields) {
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
