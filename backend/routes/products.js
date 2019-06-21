var express = require('express');
var router = express.Router();

// Show all list of products
router.get('/', function(req, res, next) {
 req.getConnection(function(error, conn) {
   if(error) throw error;
   conn.query('select p.*, c.code_name, s.Suplier_Name from product p, category c, supplier s Where p.Category_CODE=c.code and p.Supplier_ID = s.Supplier_ID order by product_id', function(err, rows, fields) {
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

// Show sepecific product detail
// router.get('/:id', function (req, res, next) {
//  req.getConnection(function(error, conn) {
//      conn.query('SELECT * FROM Product Where Product_ID = ' +req.params.id, function(err, rows) {
//          if (!err){
//              console.log('category detail information: ' + rows)
//          }          
//          var id = parseInt(req.params.id, 10)          
//          var product_detail= detail_row.filter(function (_detail_row) {
//            return _detail_row.id === id
//          });
//          res.send(product_detail);
//      })
//  })
// })

// http://localhost:3000/product/delete/0
// delete product to DB
router.delete('/delete/:id', function(req, res){
    var delProduct = parseInt(req.params.id, 10)
    console.log("Deleted row: " + delProduct)
    req.getConnection( function (error, conn) {
        conn.query('Delete From Product Where Product_ID = ?', [delProduct], function(error, result, fields){
            if(!error){
                console.log('deleted successfully');
                // res.redirect(request.get('referer'));
                // res.render('index')
                // res.end()
                // req.method = 'GET'
                // res.redirect(req.get('referer'));
                // res.redirect(303, "/");
                res.send(result)
            } else {
                console.log('delete failed')
            }
            
        })
    })
})

// add new product to DB
router.post('/add', function(req, res){
    var product = [
        [req.body.Product_ID,
        req.body.Kor_Name,
        req.body.Eng_Name,
        req.body.Supplier_ID,
        req.body.Category_CODE,
        req.body.Unit,
        req.body.Unit_Weigh,
        req.body.Price]
    ]
    console.log(product)
    req.getConnection(function(error, conn){
        if(!error) {
            conn.query('INSERT INTO product (Product_ID, Kor_Name, Eng_Name, Supplier_ID, Category_CODE, Unit, Unit_Weigh, Price) values ?',[product],function(err, result){
                if(!err){
                    console.log('add success product')
                    res.send(result)
                } else{
                    console.log('fail to add product')
                    console.log(err)
                }
            })
        } else {
            console.log(error)
        }
    })
//Product_ID, Kor_Name, Eng_Name, Category_CODE, Supplier_ID, Unit, Unit_Weigh, Price, Stock_0512
})
module.exports = router;

// let sup = req.body;
// var sql = "SET @Supplier_ID = ?; SET @Suplier_Name = ?; SET @Phone_Number1 = ?; SET @Phone_Number2 = ?; SET @Address = ?; Set @Contact = ?; \
// Insert Into supplier values(@Supplier_ID, @Suplier_Name, @Phone_Number1, @Phone_Number2, @Address, @Contact );";
// req.getConnection(function(error, conn) {
//     conn.query(sql,[sup.Supplier_ID, sup.Suplier_Name, sup.Phone_Number1, sup.Phone_Number2, sup.Address, sup.Contact],function(err, detail_row, fields) {
//         if (err) throw err;
//         res.send('Deleted sucessfully');          
//     })
// })
