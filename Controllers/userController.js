import { errorHandler } from "../Utils/error.js";
import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "Unauthorized access to update the user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 character"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 16) {
      return next(
        errorHandler(400, "Username must be between 7 and 16 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username must not contain spaces"));
    }
    if (req.body.username != req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be Lowercase"));
    }
    if (!req.body.username.match(/^[A-Za-z0-9 ]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(400, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted Successfully");
  } catch (error) {
    next(error);
  }
};
