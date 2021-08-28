let mongoose = require('mongoose');
let joi = require('@hapi/joi');
const { array } = require('@hapi/joi');


let feedbackSchema = mongoose.Schema({
   name: String,
   email: String,
   description:String,
   approved:{
       type:Boolean,
       default:false
   }


});


let feedbackModel = mongoose.model('feedback',feedbackSchema);


let validation = (data)=>{
    const schema = joi.object({

        name: joi.string().min(3).max(15).required(),
        email: joi.string().email().required(),
        description: joi.string().required(),
        approved: joi.boolean(),

        
    })


    return schema.validate(data,{abortEarly:false});
};



module.exports.Feedback = feedbackModel;
module.exports.validationFeedback = validation;