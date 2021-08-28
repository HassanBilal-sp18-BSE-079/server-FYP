const mongoose = require('mongoose');
const joi = require('@hapi/joi');



let pcPartsSchema = mongoose.Schema({
    title:String,
    price: Number,
    quantity:Number,
    model : String,
    type: String,
    image:{
        thumbnail:String,
        gallery: Array,
    },
    discription:{
        StorageCapacity: String,
        PowerConsumption: String,
    }

});





let pcPartsModel = mongoose.model('pcParts',pcPartsSchema);


let validation = (data)=>{
    const schema = joi.object({
    title: joi.string().required() ,
    price: joi.number().required(),
    quantity:joi.number().required(),
    model : joi.string().required(),
    type: joi.string().required(),
    
    thumbnail:joi.string().required(),
    gallery: joi.array().required(),

    StorageCapacity: joi.string(),
    PowerConsumption: joi.string(),
    
    });


    return schema.validate(data,{abortEarly:false});
};



module.exports.PcParts = pcPartsModel;
module.exports.validationPcParts = validation;