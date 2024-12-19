import Restaurant from "../models/restaurant.js";

const updateRestaurant = async (req, res) => {

    const {id} = req.params;
    const {updatedData} = req.body;

   try {

    const restaurant = await Restaurant.findOneAndUpdate( { _id: id }, updatedData, { new : true} );

    if (!restaurant) 
        {
            return restaurant.status(404).json({message: "Rerstaurant not found with the id"});
        }

    res.status(201).json({message: 'Successfully updated restaurant', data: restaurant});

   } catch (error) {
    
    res.status(500).json({message: 'Failed to update restaurant', error: error.message});
    console.error("Failed to update restaurant", error.message);
   }
};

export default updateRestaurant;