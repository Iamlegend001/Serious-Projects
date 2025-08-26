const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const {
    userName,
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      userName,
      fullName: { firstName, lastName },
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

async function loginUser(req, res) {
  const { email, userName, password } = req.body;

  try {
    let user;
    if (email) {
      user = await userModel.findOne({ email });
    } else if (userName) {
      user = await userModel.findOne({ userName });
    } else {
      return res
        .status(400)
        .json({ message: "Email or username must be provided" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

async function getUser(req, res) {
  try {
    // req.user is set in middleware (auth.middleware.js)
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password"); // hide password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = { registerUser, loginUser, getUser};
