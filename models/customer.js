var mongoose =require("mongoose")
var customerSchema = mongoose.Schema({
    name : String,
    email: String,
    password: String
})

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;