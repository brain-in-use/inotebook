const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
// POST route with validation
router.post(
  '/',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // If validation fails, send errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
        res.json({error: 'Please enter a unique value foe email'})
    })
  }
);

module.exports = router;