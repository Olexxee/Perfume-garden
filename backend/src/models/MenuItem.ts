import mongoose from "mongoose";

export type MenuCategory = "food" | "drink" | "room";

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    enum: ["food", "drink", "room"],
    required: true,
  },
});

export default mongoose.model("MenuItem", MenuItemSchema);