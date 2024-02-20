var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
 
});

// router.get('/cart', function(req, res, next) {
//   let cart = req.cookies.cart;
//   if(!cart){
//     cart = [];
//   }
//   console.log("jjjjjjjj")
//   res.render("cart", {"cart": cart });

// });



// router.get("/cart/:id", async function(req, res, next) {
 
//   let cart = [];
//   if(req.cookies.cart) {
//      cart = req.cookies.cart;}
//   res.cookie("cart",cart);
//   console.log("add this product");
//   res.redirect("/products");
// });



module.exports = router;
