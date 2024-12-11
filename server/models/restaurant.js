import mongoose from "mongoose";
import validator from 'express-validator';

const RestaurantSchema = new mongoose.Schema({

    // NAME
    name: 
    {
        type: String, required: true, trim: true, minlength: 2, maxlength: 15
      },
    //   ENDS

    // TABLES
      tables: 
      {
        type: Number, required: true, min: 1, max: 100
      },
    //   ENDS

    // COLOR
      color: 
      {
        type: String,
        required: true,
        validate: 
        {
          validator: function(v) 
          {
            return /^#([0-9A-F]{3}){1,2}$/i.test(v);
          },
          message: props => `${props.value} is not a valid hex color!`
        }
      },
    //   ENDS

    // DESCRIPTIONS
      description: 
      {
        type: String, required: true, trim: true, maxlength: 500
      },
    //   ENDS

    // LOCATION
      location: 
      {
        type: String, required: true, trim: true
      },
    //   ENDS

    // TIMESLOT
      timeslot: 
      {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s*-\s*([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      },
    //   ENDS

    // CUISINE
      cuisine: 
      {
        type: String, required: true, trim: true
      },
    //   ENDS

    // IMAGE
      image: 
      {
        type: String,
        validate: 
        {
          validator: function(v) 
          {
            return v === null || 
                   v.match(/\.(jpeg|jpg|gif|png)$/) || 
                   v.startsWith('file://') || 
                   v.startsWith('http');
          },
          message: props => `${props.value} is not a valid image path!`
        }
      },
    //   ENDS

    // COORDINATES
      coordinates: 
      {
        latitude: 
        {
          type: Number, required: true, min: -90, max: 90
        },

        longitude: 
        {
          type: Number, required: true, min: -180, max: 180
        }
      },
    //   ENDS

    // CREATED AT 
      createdAt: 
      {
        type: Date, default: Date.now
      },
    //   ENDS

    // STATUS
      isActive: 
      {
        type: Boolean, default: true
      }
    //   ENDS

    }, 

    {
      timestamps: true
    }

    );

const Restaurant = mongoose.model("Restaurants", RestaurantSchema);
export default Restaurant;