import User from "../models/user.js";


// GET USERS

export const getUsers = async(req, res)=>{

    try {
        const allUsers = await User.find();

        if (allUsers.length > 0) {
            const users = allUsers.map(user => ({
                id: user.id,
                email: user.email,
                password:  user.password,
                phone: user.phone,

            }));

            res.status(200).json(users);
        }

        else{
            console.error({message: error})
            res.status(404).json({message: "No users found"});
        }
    } catch (error) {
        res.status(500).json({error: "External error occured"});
    }
}