import dotenv from "dotenv";
import app from "./src/server.js";
import { connectDB } from "./src/config/db.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    console.log("app hit")
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();