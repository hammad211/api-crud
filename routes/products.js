var express = require('express');
var router = express.Router();
var Product = require ("../models/product")
var Cart = require ("../models/cart")
// var checkAuth = require ("../middleware/checkAuth")

//get all
router.get('/',  async (req, res, next) =>{
  try{
  let products = await Product.find();
  console.log("get all products");
  return res.send (products)
  }
  catch(err){
    console.log("err")
  }
});

//get by id
router.get("/:id" ,  async (req, res) =>{
  try{
  let products = await Product.findById(req.params.id)
  console.log("get product  by id");
  return res.send (products);
  }
  catch(err){
    return res.status(400).send("invalid id");
  }
});


//add new
router.post('/add',   async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  // res.redirect("/products");
  console.log("product has been added");
  return res.send (product);
});

//delete by id
router.delete("/:_id", async function(req, res, next) {
  try{
  let product = await Product.findByIdAndDelete(req.params._id);
  // res.redirect("/products");
  console.log(" delete by id");
  return res.send(product)
  }
  catch(err){
   return res.send("Invalid Id")
  }
});

// router.post("/edit/:_id",  async function(req, res, next) {
//   try {
//     let product = await Product.findById(req.params._id);
    
//     product.name = req.body.name;
//     product.price = req.body.price;

//     await product.save();
//     return res.send(product)

//     // res.redirect("/products");
//   } catch (error) {
//     console.error(error);
//   }
// });

//update by id
router.put("/:id", async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    console.log(req.body)
    product.name = req.body.name;
    product.Price = req.body.price;
    await product.save();
    return res.send(product)

  } catch (error) {
    console.error(error);
  }
});












// router.get("/cart/:id", async function(req, res, next) {
//   let product = await Product.findById(req.params.id);
//   console.log(product);
//   let cart = [];
//   if (req.cookies.cart) cart = req.cookies.cart;
//   cart.push(product);
//   res.cookie("cart", cart);
//   console.log("add this product");
//   res.redirect("/products");
// });





// router.get("/cart/remove/:id", async function(req, res, next) {

//   let cart = [];
//   if(req.cookies.cart) {
//      cart = req.cookies.cart;}
//      cart.splice(cart.findIndex((c)=>(c._id == req.params.id)),1)
     
//   res.cookie("cart",cart);
//   console.log("add this product");
//   res.redirect("/cart");
// });


module.exports = router;
