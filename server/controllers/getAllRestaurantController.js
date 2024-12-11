
import Restaurant from "../models/restaurant.js";


// GET ALL RECIPES WITH PAGINATION
const getAllRestaurants = async (req, res) => {

    // DEFAUL TO PAGE 1 AN LIMIT OF 15
    const { page = 1, limit = 15 } = req.query;
    // ENDS


    try {
        const restaurants = await Restaurant.find()

            // LIMIT THE NUMBER OF RECIPES RETURNED
            .limit(Number(limit))      
            // ENDS

            // SKIP THE NUMBER OF RECIPES RETURNED
            .skip((page - 1) * limit) // Skip the number of recipes based on the current page
            // ENDS

            // EXECUTE THE  QUERY
            .exec();
            // ENDS

        // GET THE TOTAL COUNT OF RECIPES
        const total = await Restaurant.countDocuments(); 

        res.status(200).json({
            total,                          // Total number of recipes
            page: Number(page),             // Current page number
            limit: Number(limit),           // Items per page
            restaurants                     // Recipes for the current page
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getAllRestaurants;
// ENDS