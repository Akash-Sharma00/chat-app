import userModel from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loogedInUserId = req.user._id;
    const allUser = await userModel
      .find({ _id: { $ne: loogedInUserId } })
      .select("-password");
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find().select("-password");
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};
