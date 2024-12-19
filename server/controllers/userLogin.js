import User from "../models/user.js";
import GenerateToken from "../utils/index.js";


// LOGIN

export const LoginUser = async(req, res)=>{

    try {

        // DATA RECEIVED FROM THE USER
        const { email, password } = req.body;

        // FIND THE USER
        const fetchUser = await User.findOne({email});

        if (!fetchUser || !(await fetchUser.matchPassword(password))){
            return res.status(401).json({error: "Invalid credentials"});
        }

        const UserToken = GenerateToken(fetchUser._id);
                res.status(200)
                .json({
                    message:  "User logged in successfully with", 
                    id: fetchUser._id, 
                    email: fetchUser.email, 
                    token: UserToken,
                    role: fetchUser.role || '',
                    name: fetchUser.name || '',
                    phone: fetchUser.phone || '',
                    isActive: fetchUser.isActive || '',
                    restaurantName: fetchUser.restaurantName || '',
                });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({error: "Internal server error"});
    }
}
// ENDS