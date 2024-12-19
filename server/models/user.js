import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// ADMIN / USER SCHEMA
const userSchema = new mongoose.Schema({

    // EMAIL
    email: 
    { 
        type: String, 
        required: true, 
        unique: true 
    },

    // PASSWORD
    password: 
    { 
        type: String, 
        required: true 
    },

    // STATUS
    isActive: 
    { 
        type: Boolean, 
        default: true 
    },

    // ROLE
    role: 
    { 
        type: String, 
        required: true 
    },

    // RESTAURANT NAME
    restaurantName: 
    { 
        type: String, 
        required: true 
    },

    // ADMIN NAME
    name: 
    { 
        type: String, 
        required: true 

    },

    // ADMIN PHONE NUMBER
    phone: 
    { 
        type: Number, 
        required: true 
    },

    // TIMESTAMP
}, { timestamps: true });

// HASHING THE PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// SAVING TO COLLECTION
const User = mongoose.model("Admins", userSchema);
export default User;