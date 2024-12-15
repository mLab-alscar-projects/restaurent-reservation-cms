import Restaurant from "../models/restaurant.js";

const GetRestaurantByID = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: "restaurant not found" });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default GetRestaurantByID;