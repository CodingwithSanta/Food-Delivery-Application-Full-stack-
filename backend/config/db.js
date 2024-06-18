import mongoose from "mongoose"

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://santhosh:03032006+!!@cluster0.hebbgnx.mongodb.net/order-food').then(()=>console.log("DB connected"));
}