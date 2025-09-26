import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB Connection Failed ", error);
    process.exit(1); // server band kar do agar DB connect na ho
  }
};

export default connectDB;
