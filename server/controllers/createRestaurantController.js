import Restaurant from "../models/restaurant.js";


// CREATE newProduct
const createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create({
            ...req.body,      
            userID: req.user.id   
        });

        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error creating product: " + error.message });
    }
};

export default createRestaurant;
// ENDS