var express = require('express');
var router = express.Router();
let {User} = require('../../model/userModel');
let bcrypt = require('bcryptjs');
let config = require('config');
let jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// get singel user
router.get('/:id', async function(req, res, next) {
  
  let user = await User.findById(req.params.id);

  res.send(user);
});



// signup
router.post('/register', async function(req, res) {

  

let user = await User.findOne({email:req.body.email});

  if(user) return res.status(400).send('A user with this email already exists');

  user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;

  await user.save();

  return res.send(user);
});




//login


router.post('/login', async (req,res)=>{

  let user = await User.findOne({email:req.body.email});

  if(!user) return res.send('user with given Email does not exist');

  let passwordComparison = await bcrypt.compare(req.body.password, user.password );

  if(!passwordComparison) return res.status(403).send('Invalid Password');


  let tokken = jwt.sign({userId:user._id,userName:user.name}, config.get("JWT_SECRET") );

  return res.send(tokken);

});


module.exports = router;
