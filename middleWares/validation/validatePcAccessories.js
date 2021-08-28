let { validationPcAccessories, PcAccessories } = require("../../model/pcAccessoriesModel");

let validatePcAccessories = (req, res, next) => {
	req.body.thumbnail = req.files.thumbnail[0].filename;
	req.body.gallery = req.files.gallery;

	let { error } = validationPcAccessories(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	next();
};





let validateUpdatedPcAccessories = async (req,res,next)=>{
    
    let product = await PcAccessories.findById(req.params.id);

    if(req.files.thumbnail && req.files.gallery){
        req.body.thumbnail= req.files.thumbnail[0].filename;
        req.body.gallery= req.files.gallery;
    }
    else if(req.files.thumbnail || req.files.gallery ){
        if(req.files.thumbnail){

            req.body.thumbnail= req.files.thumbnail[0].filename;
            req.body.gallery = product.image.gallery;
        }
        else if(req.files.gallery){

            req.body.thumbnail = product.image.thumbnail;
            req.body.gallery= req.files.gallery;
        }
        
    }
    else{

        req.body.thumbnail = product.image.thumbnail;
        req.body.gallery = product.image.gallery;
    }
    


     let {error} = validationPcAccessories(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    next();

};



module.exports.validation = validatePcAccessories;
module.exports.validationUpdated = validateUpdatedPcAccessories;
