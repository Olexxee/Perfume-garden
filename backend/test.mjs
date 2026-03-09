import mongoose from "mongoose";
import "dotenv/config";

console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Connected!");
    console.log("DB name:", mongoose.connection.name);
    return mongoose.connection.db.admin().ping();
  })
  .then(() => {
    console.log("Ping successful!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });
