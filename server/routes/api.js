import express from "express";

// CONTROLLERS
import { LoginUser } from "../controllers/userLogin.js";
import { createUser } from "../controllers/userRegister.js";
import { getUsers } from "../controllers/getUsersController.js";

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

    body('phone')
        .isLength({ min: 10})
        .isLength({ max: 11})
        .withMessage("Please enter a valid phone number")
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


export default router;