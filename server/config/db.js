import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI must be set in server/.env");
    }

    await mongoose.connect(MONGODB_URI, { dbName: "org_db" });
    console.log('MongoDB Atlas connected to org_db');
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
