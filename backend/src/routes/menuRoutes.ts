import express from "express";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/menuController.js";

const router = express.Router();

router.get("/", getMenu);

router.post("/", createMenuItem);

router.patch("/:id", updateMenuItem);

router.delete("/:id", deleteMenuItem);

export default router;