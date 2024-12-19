import User from "../models/user.js";
import bcrypt from "bcrypt";


// CREATE A USER
export const createUser = async (req, res) => {


    try {
        const { email, password, role, name, phone, restaurantName } = req.body;
        const userExists = await User.findOne({ email });

        // CHECKING THE EXISTENT OF THE USER
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword, role, name, phone, restaurantName });
        res.status(201).json({message: "User Successfully registered", 
            id: user.id, 
            email: user.email, 
            role: user.role, 
            name: user.name, 
            phone: user.phone, 
            restaurantName: user.restaurantName 
        });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error(error);
    }


}
// ENDS