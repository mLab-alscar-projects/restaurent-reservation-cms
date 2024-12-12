import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

// CONTROLLERS
import { LoginUser } from "../controllers/userLogin.js";
import { createUser } from "../controllers/userRegister.js";
import { getUsers } from "../controllers/getUsersController.js";

import createRestaurant from "../controllers/createRestaurantController.js";
import getAllRestaurants from "../controllers/getAllRestaurantController.js";

import { addOrUpdateMenu } from "../controllers/menuController.js";
import { getRestaurantMenu } from "../controllers/getRestaurantMenuController.js";

// VALIDATOR
import { body, validationResult } from 'express-validator';

// ROUTER
const router = express.Router();

// USER REGISTER AND LOGIN ROUTES

router.post(
  "/register",
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
      
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser
);

// LOGIN ROUTE
router.post("/login",  LoginUser);

// FOR DEBUGGING CASE
router.get("/users", getUsers);

// USER REGISTER AND LOGIN ENDS

// POST RESTAURANT
router.post("/restaurant", protect, createRestaurant);

// GET RESTAURANTS
router.get("/fetchRestaurants", protect, getAllRestaurants);

// ADD MENU
router.post('/restaurants/:id/menu', protect, addOrUpdateMenu);

// GET MENU
router.get("/restaurants/:restaurantId/menu", protect, getRestaurantMenu);


export default router;