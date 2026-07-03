import express from "express";
import { Router } from "express";
import cloudinary from "cloudinary";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
//import Product from "../model/product.model.js";
const router = Router();

// create user
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET,
      );

      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "Account already activated" });
      }

      // Validate required fields
      if (!password) {
        console.error("Password is missing from token");
        return next(
          new ErrorHandler("Password is missing from activation token", 400),
        );
      }

      if (!avatar || !avatar.public_id || !avatar.url) {
        return next(
          new ErrorHandler("Invalid avatar data in activation token", 400),
        );
      }

      try {
        user = await User.create({
          name,
          email,
          avatar,
          password,
        });

        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//user login
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

//load user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);


//user logout
router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
try{
res.cookie("token", null, {
  expires: new Date(Date.now()),
  httpOnly: true,
});
res.status(200).json({
  success: true,
  message: "Logged out successfully",
});
}catch (error) {

}
}))

export default router;
