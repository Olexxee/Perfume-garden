import express from "express";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controller/menuController.js";

const menuRouter = express.Router();

menuRouter.get("/", getMenu);

menuRouter.post("/", createMenuItem);

menuRouter.patch("/:id", updateMenuItem);

menuRouter.delete("/:id", deleteMenuItem);

export default menuRouter;
