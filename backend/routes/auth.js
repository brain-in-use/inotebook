const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "appleisgood$";
let success = false;

// ROUTE 1: Create a new user using POST '/api/auth/createuser'
router.post(
  '/createuser',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Check if a user with the same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: 'A user with the same email already exists.' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE 2: Authenticate user using POST '/api/auth/login'
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password cannot be blank'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Invalid credentials. Please try again.' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: 'Invalid credentials. Please try again.' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE 3: Get logged-in user details using POST '/api/auth/getuser'
router.post(
  '/getuser',
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      res.json({ success: true, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
