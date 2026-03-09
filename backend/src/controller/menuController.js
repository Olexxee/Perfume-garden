import MenuItem from "../models/MenuItem.ts";

export const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const item = await MenuItem.create({
      name,
      price,
      category,
    });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create menu item" });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update menu item" });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    await MenuItem.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
