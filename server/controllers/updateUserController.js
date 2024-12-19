import User from "../models/user.js";

export const updateUser = async (req, res) => {

    const {updatedUser} = req.body;
    const {id} = req.params;

    try {

        const user = await User.findOne({_id: id}, updatedUser, {new: true});

        if(!user) {

          return  user.status(404).json({message: 'User not found'});

        } 

        user.status(200).json({message: "User successfully updated", data: user});
        
    } catch (error) {

        res.status(500).json({message: "Internal error", data: error});
        console.error("Failed to update restaurant", error.message);

    }
}