var mongoose =require("mongoose")
var productSchema = mongoose.Schema({
    name : String,
    Price : String,
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;