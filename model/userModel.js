let mongoose = require('mongoose');
let joi = require('@hapi/joi');
const { array } = require('@hapi/joi');


let userSchema = mongoose.Schema({
   name: String,
   email: String,
   password:String,
   profilePic:String,
   role:{
       type:String,
       default:"user"
   }


});


let userModel = mongoose.model('users',userSchema);


let validation = (data)=>{
    const schema = joi.object({

        name: joi.string().min(3).max(15).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        profilePic: joi.string(),

        
    })


    return schema.validate(data,{abortEarly:false});
};



module.exports.User = userModel;
module.exports.validationPreBuilt = validation;