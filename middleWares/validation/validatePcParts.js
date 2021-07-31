

let {validationPcParts} = require('../../model/pcPartsModel');


let validatePcParts = (req,res,next)=>{


    req.body.thumbnail= req.files.thumbnail[0].filename;
    req.body.gallery= req.files.gallery;


     let {error} = validationPcParts(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

   

    next();

};


module.exports.validation = validatePcParts;