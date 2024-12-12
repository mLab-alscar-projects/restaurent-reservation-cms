import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {

    // REFERENCE TO RESTAURANT
    restaurantId: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants", 
        required: true,
    },

    // MENU ITEMS
    menuItems: [
        {
        id: 
        {
            type: String, 
            required: true, 
            unique: true, 
            trim: true,
        },

        name: 
        {
            type: String, 
            required: true, 
            trim: true,
            minlength: 2, 
            maxlength: 50,
        },

        price: 
        {
            type: String, 
            required: true,
            match: /^R\d+(\.\d{2})?$/, 
        },

        image: 
        {
            type: String,
            validate: 
            {
            validator: function (v) 
            {
                return v.match(/\.(jpeg|jpg|gif|png)$/) || 
                    v.startsWith('file://') || 
                    v.startsWith('http');
            },
            message: props => `${props.value} is not a valid image path!`
            }
        },
    },
  ],
}, { timestamps: true });

// CREATE MODEL
const Menu = mongoose.model("Menus", MenuSchema);
export default Menu;
