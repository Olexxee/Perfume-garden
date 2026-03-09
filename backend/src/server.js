import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import { verifyAdmin } from "./middlewares/auth.js";
import router from "./routes/menuRoutes.ts";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/admin", adminRoutes);
app.use("/api/menu", verifyAdmin, router);

export default app;
