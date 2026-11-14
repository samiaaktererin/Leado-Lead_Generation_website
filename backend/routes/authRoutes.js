import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", protect, getMe);
router.post("/logout", protect, logoutUser);

// Admin-only test route
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the LEADO Admin Area.",
      user: req.user.toJSON()
    });
  }
);

// User-only test route
router.get(
  "/user",
  protect,
  authorizeRoles("user"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to your LEADO user account.",
      user: req.user.toJSON()
    });
  }
);

export default router;