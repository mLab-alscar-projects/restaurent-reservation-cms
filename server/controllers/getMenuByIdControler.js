import Menu from "../models/menu.js";

const GetMenuByID = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default GetMenuByID;