const express = require("express");
const { LoginHandler, RegisterHandler, authController } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Login fuction
router.post("/login", LoginHandler);

//Register fuction
router.post("/register", RegisterHandler);
//Auth fuction
router.post("/getUserdata", authMiddleware,authController);
module.exports = router;
