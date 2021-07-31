let mongoose = require('mongoose');
let joi = require('@hapi/joi');
const { array } = require('@hapi/joi');


let preBuiltDesktopSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    discription: {
        RAM: String,
        CPU: String,
        GPU: String,
        PSU: String,
        MotherBoard: String,
        HardDrive: String,
        Casing: String,
    },
    model: String,
    type:String,
    image:{
        thumbnail: String,
        gallery: Array,
    }
});


let preBuiltDesktopModel = mongoose.model('preBuiltDesktops',preBuiltDesktopSchema);


let validation = (data)=>{
    const schema = joi.object({
        title: joi.string().min(2).required()  ,
        price: joi.number().min(0).required(),
        quantity: joi.number().min(0).required(),
        
        RAM: joi.string().min(3).required(),
        CPU: joi.string().min(3).required(),
        GPU: joi.string().min(3).required(),
        PSU: joi.string().min(3).required(),
        MotherBoard: joi.string().min(3).required(),
        HardDrive: joi.string().min(3).required(),
        Casing: joi.string().min(3).required(),
        
        model: joi.string().min(3).required(),
        type: joi.string().min(3).required(),
        thumbnail: joi.string().required(),
        gallery: joi.array().required(),
    })


    return schema.validate(data,{abortEarly:false});
};



module.exports.PreBuiltDesktop = preBuiltDesktopModel;
module.exports.validationPreBuilt = validation;