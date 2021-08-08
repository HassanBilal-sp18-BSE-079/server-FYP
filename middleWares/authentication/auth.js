const jwt = require('jsonwebtoken');
const { User } = require('../../model/userModel');
config = require('config');


let auth = (req,res,next)=>{
   
    let token = req.header.token;

    if(!token) return res.status(401).send('Tokken not found');

    let tokeninfo = jwt.verify(token,config.get("JWT_SECRET"));

    req.user = tokeninfo;

    next();

};


module.exports.auth = auth;