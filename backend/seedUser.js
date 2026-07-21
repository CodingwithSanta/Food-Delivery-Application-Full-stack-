import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import 'dotenv/config';
import userModel from "./models/userModel.js";

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    const email = "admin@admin.com";
    const password = "password123";

    const exists = await userModel.findOne({ email });
    if (!exists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        name: "Admin User",
        email: email,
        password: hashedPassword
      });

      await newUser.save();
      console.log(`✅ Test user created! Email: ${email} | Password: ${password}`);
    } else {
      console.log("Test user already exists.");
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUser();
