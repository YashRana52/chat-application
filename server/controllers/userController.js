import cloudinary from "../configs/cloudinary.js";
import { genToken } from "../configs/utils.js";

import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "Missing required details",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      bio,
    });

    // generate token
    const token = genToken(newUser._id);

    // send response without password
    const { password: _, ...userData } = newUser._doc;

    return res.json({
      success: true,
      message: "Account created successfully",
      userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check empty fields
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found with this email",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = genToken(user._id);

    // hide password before sending
    const { password: _, ...userData } = user._doc;

    return res.json({
      success: true,
      message: "Login successful",
      userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//controller to check user is Authenticated

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

//controller to update user profile details

export const updateProfile = async (req, res) => {
  try {
    const { bio, fullName } = req.body;
    const userId = req.user._id;

    let profilePicUrl;

    // Agar file upload hua hai multer ke sath
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      profilePicUrl = upload.secure_url;
    }

    // Agar frontend se base64 bhej rahe ho
    if (req.body.profilePic) {
      const upload = await cloudinary.uploader.upload(req.body.profilePic, {
        folder: "profiles",
      });
      profilePicUrl = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(bio && { bio }),
        ...(fullName && { fullName }),
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      },
      { new: true }
    );

    return res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error: ", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
