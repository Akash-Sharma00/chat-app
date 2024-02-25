import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCoockie from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalide username or password" });
    }
    generateTokenAndSetCoockie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: username,
      profilePic: User.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};

export const signupUser = async (req, res) => {
  console.log("sign up");

  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json("Password and confirm password are not same");
    }

    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ error: "Username is already used by other user" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCoockie(newUser._id, res);

      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json("Invalide json data");
    }
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};
export const logOutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};
