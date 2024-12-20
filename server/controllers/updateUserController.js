import User from "../models/user.js";

export const updateUser = async (req, res) => {

    const {updatedUser} = req.body;
    const {id} = req.params;

    try {

        const user = await User.findOneAndUpdate({_id: id }, updatedUser, {new: true});

        if(!user) {

          return  res.status(404).json({message: 'User not found'});

        } 

        res.status(200).json({message: "User successfully updated", data: user});
        
    } catch (error) {

        res.status(500).json({message: "Internal error", error});
        console.error("Failed to update restaurant", error.message);

    }
}