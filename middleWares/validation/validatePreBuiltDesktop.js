let {validationPreBuilt} = require('../../model/prebuiltDesktopModel');


let validatePreBuiltDesktop = (req,res,next)=>{


    req.body.thumbnail= req.files.thumbnail[0].filename;
    req.body.gallery= req.files.gallery;


     let {error} = validationPreBuilt(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    next();

};


module.exports.validation = validatePreBuiltDesktop;