const jwt = require('jsonwebtoken');
const { User } = require('../../model/userModel');
const config = require('config');



let auth = async (req,res,next)=>{
   
       //console.log(req.header('token'));
    let token = req.header('token');

    if(!token) return res.status(401).send('Tokken not found');
    try{
    let tokeninfo = jwt.verify(token,config.get("JWT_SECRET"));

    //console.log(tokeninfo);

    req.user = tokeninfo;

}  catch(err){
    return res.status(401).send('invalid Token');
}

    next();

};


module.exports.auth = auth;