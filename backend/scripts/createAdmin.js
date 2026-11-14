import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Please configure ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env"
      );
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error(
        "Administrator password must contain at least 12 characters."
      );
    }

    const email = ADMIN_EMAIL.trim().toLowerCase();

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      if (existingAdmin.role === "admin") {
        console.log("Administrator account already exists.");
      } else {
        throw new Error(
          "This email belongs to a normal user. Use a different administrator email."
        );
      }

      return;
    }

    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      12
    );

    const admin = await User.create({
      name: ADMIN_NAME.trim(),
      email,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Administrator created successfully.");
    console.log("Admin email:", admin.email);

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();