var mongoose =require("mongoose")
var cartSchema = mongoose.Schema({
    name : String,
    Price : String,
    img   : String,
})

const cart = mongoose.model("Cart", cartSchema);
module.exports = cart;