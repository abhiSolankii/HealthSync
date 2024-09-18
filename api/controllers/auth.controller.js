import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (
    !fullname ||
    !username ||
    !email ||
    !password ||
    fullname === "" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      if (user.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }

      if (user.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    //hash password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    //create a new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    //save new user
    if (newUser) {
      // console.log(newUser);
      await newUser.save();
      res.status(201).json({ message: "Sign Up successful. Please Login" });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in Sign Up: ", error);
    res.status(500).json({ message: "Failed to Sign Up" });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username === "" || password === "") {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const validUser = await User.findOne({ username });
    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      validUser?.password || ""
    );
    if (!validUser || !isPasswordCorrect)
      return res.status(400).send({ message: "Invalid username or password" });

    //generate token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...user } = validUser._doc;

    res
      .status(200)
      .cookie("health_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV_PROD === "true" ? "None" : "Lax",
        secure: process.env.NODE_ENV_PROD === "true",
      })
      .json({ message: "SignIn Successful", user });
  } catch (error) {
    console.error("Error in SignIn controller", error.message);
    res.status(500).json({ error: "Failed to SignIn" });
  }
};

export const signOut = async (req, res) => {
  try {
    res
      .clearCookie("health_token")
      .status(200)
      .send({ message: "Signed out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error in Signing out!", error });
  }
};
