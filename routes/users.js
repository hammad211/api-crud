const express = require("express");
let router = express.Router();
let { User } = require("../models/users");
const bcrypt = require('bcryptjs');
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  // let salt = await bcrypt.genSalt(10);
  // user.password =await bcrypt.hash(user.password, salt);
  // await user.generateHashedPassword();
  await user.save();
  return res.send("successfully login");
});
router.post("/login", async (req, res) => {
  
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  console.log(req.body.password);
  console.log(user.password);

  const isValid =await  bcrypt.compare(user.password, req.body.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  // let token = jwt.sign(
  //   { _id: user._id, name: user.name },
  //   config.get("jwtPrivateKey")
  // );
  res.send("login successfully");
});
module.exports = router;