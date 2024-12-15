import Menu from "../models/menu.js";

export const editMenu = async (req, res) => {
  const { restaurantId, menuItemId } = req.params; // Extract restaurantId and menuItemId from URL parameters
  const { updatedItem } = req.body; // Extract updated item from the body

  try {
    // Find the menu for the specific restaurant
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return res.status(404).json({
        error: "Menu not found for this restaurant.",
      });
    }

    // Find the menu item to update by matching the menuItemId with the id in the menuItems array
    const itemIndex = menu.menuItems.findIndex((item) => item.id === menuItemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        error: `Menu item with ID ${menuItemId} not found.`,
      });
    }

    // Merge the existing item with the updated fields
    menu.menuItems[itemIndex] = { ...menu.menuItems[itemIndex], ...updatedItem };

    // Save the updated menu
    await menu.save();

    // Respond with the updated menu item
    res.status(200).json({
      message: "Menu item successfully updated!",
      updatedMenuItem: menu.menuItems[itemIndex], // Return the updated menu item
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
