const Users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//  Register Handler
const RegisterHandler = async (req, res) => {
  try {
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = await Users.create(req.body);
    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// Login Handler
const LoginHandler = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).json({ success: false, message: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    res.status(200).json({ success: false, message: "Invalid Credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({ success: true, message: "Login successful", token });
};

//auth controller
const authController =async(req,res)=>{
    try {
        const user=await Users.findOne({_id:req.body.userId});
        if(!user){
            return res.status(400).json({ success: false, message: "User does not exist" });
        } else{
            res.status(200).json({success:true,message:"User data",data:{
                name:user.name,
                email:user.email
            }});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { LoginHandler, RegisterHandler,authController };
