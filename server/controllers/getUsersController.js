import User from "../models/user.js";


// GET USERS

export const getUsers = async(req, res)=>{

    try {
        const allUsers = await User.find();

        if (allUsers.length > 0) {
            const users = allUsers.map(user => ({
                id: user._id,
                email: user.email,
                role: user.role || '',
                name: user.name || '',
                phone: user.phone || '',
                isActive: user.isActive || '',
                restaurantName: user.restaurantName || '',
                timestamp: user.timestamps || "",
            }));

            res.status(200).json({
                message: 'Succesfully fetched users',
                admins: users
            });
        }

        else{
            console.error({message: error})
            res.status(404).json({message: "No users found"});
        }
    } catch (error) {
        res.status(500).json({error: "External error occured"});
    }
}