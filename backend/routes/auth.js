const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="appleisgood$"

// ROUTE1: Create a new user using POST using '/api/auth/createuser'
router.post(
  '/createuser',
  [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    try {
      // Check whether user with the same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'Sorry, a user with the same email already exists.' });
      }

      //To hash and and add salt to the password
      var salt = await bcrypt.genSaltSync(10);
      var hash = await bcrypt.hashSync(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const data={
        user :{
          id: user.id
        }
      }
      const authToken =  jwt.sign(data,JWT_SECRET);
      res.json({authToken});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

//ROUTE2: Authinticate user using '/api/auth/login' . No login require

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password cannot be blank'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If validation fails, send errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      let user= await User.findOne({email});
        if(!user){
          return res.status(400).json({error:"Please try to ligin with correct credentials"});
        }
      
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          return res.status(400).json({error:"Please try to ligin with correct credentials"});
        }
        const data={
          user :{
            id: user.id
          }
        }
        const authToken =  jwt.sign(data,JWT_SECRET);
        res.json({authToken});

    }catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  })


  //ROUTE3: GEt Login user details using '/api/auth/getuser' . No login require

router.post(
  '/getuser',
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);

    // If validation fails, send errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

      var userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }


  }
)

module.exports = router;
