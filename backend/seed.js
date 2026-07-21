import mongoose from "mongoose";
import fs from "fs";
import 'dotenv/config';
import foodModel from "./models/foodModel.js";

const uploadFiles = fs.readdirSync("./uploads");

const foodData = [
  { name: "Greek salad", category: "Salad", base: "food_1.png", price: 12 },
  { name: "Veg salad", category: "Salad", base: "food_2.png", price: 18 },
  { name: "Clover Salad", category: "Salad", base: "food_3.png", price: 16 },
  { name: "Chicken Salad", category: "Salad", base: "food_4.png", price: 24 },
  { name: "Lasagna Rolls", category: "Rolls", base: "food_5.png", price: 14 },
  { name: "Peri Peri Rolls", category: "Rolls", base: "food_6.png", price: 12 },
  { name: "Chicken Rolls", category: "Rolls", base: "food_7.png", price: 20 },
  { name: "Veg Rolls", category: "Rolls", base: "food_8.png", price: 15 },
  { name: "Ripple Ice Cream", category: "Deserts", base: "food_9.png", price: 14 },
  { name: "Fruit Ice Cream", category: "Deserts", base: "food_10.png", price: 22 },
  { name: "Jar Ice Cream", category: "Deserts", base: "food_11.png", price: 10 },
  { name: "Vanilla Ice Cream", category: "Deserts", base: "food_12.png", price: 12 },
  { name: "Chicken Sandwich", category: "Sandwich", base: "food_13.png", price: 12 },
  { name: "Vegan Sandwich", category: "Sandwich", base: "food_14.png", price: 18 },
  { name: "Grilled Sandwich", category: "Sandwich", base: "food_15.png", price: 16 },
  { name: "Bread Sandwich", category: "Sandwich", base: "food_16.png", price: 24 },
  { name: "Cup Cake", category: "Cake", base: "food_17.png", price: 14 },
  { name: "Vegan Cake", category: "Cake", base: "food_18.png", price: 12 },
  { name: "Butterscotch Cake", category: "Cake", base: "food_19.png", price: 20 },
  { name: "Sliced Cake", category: "Cake", base: "food_20.png", price: 15 },
  { name: "Garlic Mushroom", category: "Pure Veg", base: "food_21.png", price: 14 },
  { name: "Fried Cauliflower", category: "Pure Veg", base: "food_22.png", price: 22 },
  { name: "Mix Veg Pulao", category: "Pure Veg", base: "food_23.png", price: 10 },
  { name: "Rice Zucchini", category: "Pure Veg", base: "food_24.png", price: 12 },
  { name: "Cheese Pasta", category: "Pasta", base: "food_25.png", price: 12 },
  { name: "Tomato Pasta", category: "Pasta", base: "food_26.png", price: 18 },
  { name: "Creamy Pasta", category: "Pasta", base: "food_27.png", price: 16 },
  { name: "Chicken Pasta", category: "Pasta", base: "food_28.png", price: 24 },
  { name: "Buttter Noodles", category: "Noodles", base: "food_29.png", price: 14 },
  { name: "Veg Noodles", category: "Noodles", base: "food_30.png", price: 12 },
  { name: "Somen Noodles", category: "Noodles", base: "food_31.png", price: 20 },
  { name: "Makha Noodles", category: "Noodles", base: "food_32.png", price: 15 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    
    await foodModel.deleteMany({});
    console.log("Cleared old foods");

    for (const data of foodData) {
      const fileMatch = uploadFiles.find(f => f.endsWith(data.base));
      if (fileMatch) {
         const newFood = new foodModel({
             name: data.name,
             description: "Food provides essential nutrients for overall health and well-being",
             price: data.price,
             category: data.category,
             image: fileMatch
         });
         await newFood.save();
         console.log(`Saved ${data.name}`);
      }
    }
    console.log("✅ Successfully added all dishes to your database!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
