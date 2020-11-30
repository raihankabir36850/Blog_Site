const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  //console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //incorrect email
  if(err.message ==='incorrect email'){
      errors.email='Email is not registered';
  }

  //incorrect password
  if(err.message ==='incorrect password'){
    errors.password='Password is wrong';
}

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 10 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.register_get = (req, res) => {
  res.render('register', {title:'Register'});
}

module.exports.login_get = (req, res) => {
  res.render('login', {title:'login'});
}

module.exports.register_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  try {
    const user = await User.create({ email, password });
    console.log(user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const user = await User.login(email, password);
    
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
   } 
  catch (err) {
       const errors= handleErrors(err)
       console.log(err.message)
       res.status(400).json({errors});
   }

}

module.exports.logout_post=(req, res) =>{
  res.cookie('jwt', ' ', { maxAge:1})
  res.redirect('/login')
}
