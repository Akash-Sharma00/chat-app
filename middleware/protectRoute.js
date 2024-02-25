import { json } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res,next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401), json({ error: "Unothorized action" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401), json({ error: "Unothorized action" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401), json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: `Server Error: ${error}` });
  }
};

export default protectRoute;
