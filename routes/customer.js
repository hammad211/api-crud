var express = require('express');
var router = express.Router();
var User = require("../models/userCustomer")
var Product = require ("../models/product")
var Cart = require ("../models/cart")
/* GET home page. */
var checkAuth = require ("../middleware/checkAuth");
const customerAuth = require('../middleware/customerAuth');


router.get('/customerHome', customerAuth, async function(req, res, next) {
  res.render('customer/customerHome'); 
  });

router.get('/customerWhy', function(req,res){
    res.render('customer/customerWhy');
})

router.get('/contact', function(req,res){
    res.render('customer/contact');
  })

router.get('/Products', customerAuth, async function(req, res, next) {
let products = await Product.find();
res.render('customer/Products',{"products": products}); 
});

router.get('/register', function(req, res, next) {
  res.render('customer/register');
});

router.post('/register',async function(req, res, next) {
  let user = new User (req.body);
  await user.save();
  res.redirect("/customer/login")
});

router.get('/login', function(req, res, next) {
  res.render('customer/login');
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/customer/login');
});

router.post('/login',async function(req, res, next) {
  let user = await User.findOne({email:req.body.email, password: req.body.password})
  if(!user) return res.redirect("/customer/login")
  req.session.user = user;
  return res.redirect("/customer/Products")
  
});

router.get('/cart',customerAuth,async function(req, res, next) {
  let cart = await Cart.find();

  res.render("customer/cart", {"cart": cart });

});

router.get('/cart/:id',customerAuth,  async function(req, res, next) {
  // let cart =new Cart
  let product = await Product.findById(req.params.id);
    await Cart.insertMany(product)
    res.redirect("/customer/cart")
});

router.get("/delete/:id",customerAuth, async function(req, res, next) {
  var id = req.params.id;
  let cart = await Cart.findByIdAndDelete(req.params.id);
  return  res.redirect("/customer/Products");
});


module.exports = router;
