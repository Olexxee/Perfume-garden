import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DB_URI = process.env.MONGO_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!DB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing MONGO_URI, ADMIN_EMAIL, or ADMIN_PASSWORD in .env");
  process.exit(1);
}

const createAdmin = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 30000 });
    console.log("MongoDB connected successfully!");

    // Define model inline after connection
    const AdminSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });
    const Admin = mongoose.model("Admin", AdminSchema);

    console.log("Admin model db host:", Admin.db.host);

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists");
      return process.exit();
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new Admin({ email: ADMIN_EMAIL, password: hashed });
    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message || error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

await createAdmin();
