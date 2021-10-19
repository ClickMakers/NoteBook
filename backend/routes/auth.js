const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var FetchUser = require('../middleware/FetchUser')

const JWT_SECRET = ''

// Route : 1 Create a new User using: Post "/api/auth/": no login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
] , async (req, res) => {
    //if there are errors, return an error message
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with email exists already 
    try {
    let user = await User.findOne({ email: req.body.email });
    if(user){
        return res.status(400).json({success,error: "Sorry a user with email already exists."});
    }else{

    // create a new user
    const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
    }

    const data = {user:{id: user.id}};


   const authtoken = jwt.sign(data, JWT_SECRET);
   
    // res.json(user)
    success = true;
    res.json({success,authtoken})

   }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    
})

//Route : 2 Authenticate a new User using: Post "/api/auth/": no login required
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password Cannot be blank').exists(),

] , async (req, res) => {
  //if there are errors, return an error message
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;

try {

  let user = await User.findOne({email});
  if(!user){ 
    
    return res.status(404).json({ errors: "Please try to login with correct credentials." });
  }

  const passwordcompare = await bcrypt.compare(password, user.password);
  if(!passwordcompare){ 
    success = false;
    return res.status(404).json({ success, errors: "Please try to login with correct credentials." });
  }

  const data = {user:{id: user.id}};

  const authtoken = jwt.sign(data, JWT_SECRET);

  success = true;
  res.json({data,success,authtoken})

}catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})

//Route : 3 Get Logging User Details using: Post "/api/auth/getuser": no login required

router.post('/getuser', FetchUser , async (req, res) => {
  //if there are errors, return an error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

try {

  userID= req.user.id;
  const user = await User.findById(userID).select("-password");
  res.send(user);

} catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}})


module.exports = router 