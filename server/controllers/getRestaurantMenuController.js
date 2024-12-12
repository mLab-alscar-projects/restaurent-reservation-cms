import Menu from "../models/menu.js";

// GET RESTAURANT MENU
export const getRestaurantMenu = async (req, res) => {
    const { restaurantId } = req.params; 

    try {
        const menu = await Menu.findOne({ restaurantId });

        if (!menu) {
            return res.status(404).json({ message: "Menu not found for this restaurant" });
        }

        res.status(200).json({
            menuId: menu._id,
            restaurantId: menu.restaurantId,
            menuItems: menu.menuItems,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
};
