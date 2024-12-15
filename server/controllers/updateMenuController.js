import Menu from "../models/menu.js";

export const editMenu = async (req, res) => {
  const { restaurantId, menuItemId } = req.params; 
  const { updatedItem } = req.body; 

  try {
   
    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return res.status(404).json({
        error: "Menu not found for this restaurant.",
      });
    }

    const itemIndex = menu.menuItems.findIndex((item) => item.id === menuItemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        error: `Menu item with ID ${menuItemId} not found.`,
      });
    }

    menu.menuItems[itemIndex] = { ...menu.menuItems[itemIndex], ...updatedItem };

 
    await menu.save();


    res.status(200).json({
      message: "Menu item successfully updated!",
      updatedMenuItem: menu.menuItems[itemIndex], 
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
