var mongoose =require("mongoose")
var userCustomerSchema = mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const userCustomer = mongoose.model("userCustomer", userCustomerSchema);
module.exports = userCustomer;