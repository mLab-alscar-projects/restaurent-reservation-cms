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

        const UserToken = await  GenerateToken(fetchUser.id);
                res.status(200).json({message:  "User logged in successfully with", id: User.id, email: User.email, token: UserToken, phone: User.phone });

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}
// ENDS