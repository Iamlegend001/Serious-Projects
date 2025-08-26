const express = require('express')
const authController = require("../controllers/auth.controller")

const authUser = require("../middlewares/auth.middleware")



const router = express.Router()

router.route("/register").post(authController.registerUser)
router.route("/login").post(authController.loginUser)
router.route("/").get(authUser,authController.getUser)




module.exports = router