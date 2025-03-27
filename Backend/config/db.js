import dotenv from "dotenv";
dotenv.config({ path: './Backend/.env' });
import mongoose from "mongoose";

const Mongo_URI = process.env.Mongo_URI || "FallbackURIHere"; // Debugging

//console.log("🔍 MongoDB URI:", Mongo_URI); // Check if it's being read

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


