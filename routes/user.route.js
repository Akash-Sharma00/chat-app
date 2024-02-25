import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {getUsersForSideBar,getAllUser  } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute,getUsersForSideBar);
router.get("/test",protectRoute,getAllUser);


export default router;