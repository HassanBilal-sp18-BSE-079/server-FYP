var express = require('express');
var router = express.Router();
let {PcParts} = require('../../model/pcPartsModel');
let {validation} = require('../../middleWares/validation/validatePcParts');
let multer = require('multer');
let fs = require('fs');






let storage = multer.diskStorage( {
destination:(req,file,cb)=>{

    let dir =  './client/uploads/pcParts'

    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    cb(null,dir);
},
filename:(req,file,cb)=>{
    cb(null, new Date().toISOString().replace(/:/g, ".") + file.originalname);
},

    
});



let fileFilter = (res,file,cb)=>{

    if((file.mimetype == 'image/jpg') || (file.mimetype == 'image/jpeg') ){
        cb(null,true);
    }
    else{
        cb(new Error('File is not of type jpg or jpeg'),false);
    }

}






let upload = multer({storage:storage , fileFilter: fileFilter });



/* GET pre-built PCs. */
router.get('/', async (req, res)=> {
  
    let products = await PcParts.find();

    return res.send(products);

});



//get singel product

router.get('/:id', async (req, res)=> {

    try{
        let product = await PcParts.findById(req.params.id);
        if(!product) return res.send("Product not present for given ID")
    return res.send(product);
    }
    catch(err){
        return res.send('Invalid Id');

    }
    
});


//Delete product


router.delete('/:id', async (req, res)=> {


 
    let product1 = await PcParts.findById(req.params.id);
   
    fs.unlinkSync('./client/uploads/' + product1.image.thumbnail);

    for (let index in product1.image.gallery){
        fs.unlinkSync('./client/uploads/' + product1.image.gallery[index]);
    }

    let product = await PcParts.findByIdAndDelete(req.params.id);

    return res.send(product);
});


//update product

router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'gallery', maxCount: 6 }]) , validation , async (req, res)=> {
    try{
        let product = await PcParts.findById(req.params.id);
        if(!product){
            return res.status(400).send("Product not present for given ID")
        }

        product.title = req.body.title;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        product.discription.StorageCapacity = req.body.StorageCapacity;
        product.discription.PowerConsumption = req.body.PowerConsumption;
     
        product.model = req.body.model;
        product.type = req.body.type;
        
        product.image.thumbnail = req.files.thumbnail[0].filename;
        for (let index in req.files.gallery){
            product.image.gallery[index] = req.files.gallery[index].filename;
        }



        await product.save();
        return res.send(product);
    }
    catch(err){
        return res.status(400).send('Invalid Id');

    }
    
});



// Add item 

//restrict picture selection in front end gallery=6  

router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'gallery', maxCount: 6 }]) , validation , async (req, res)=> {

    try{
        
        let product = new PcParts();

        product.title = req.body.title;
        product.price = req.body.price;
        product.quantity = req.body.quantity;

        product.discription.StorageCapacity = req.body.StorageCapacity;
        product.discription.PowerConsumption = req.body.PowerConsumption;
     
        product.model = req.body.model;
        product.type = req.body.type;
        
        product.image.thumbnail = req.files.thumbnail[0].filename;
        for (let index in req.files.gallery){
            product.image.gallery[index] = req.files.gallery[index].filename;
        }


        await product.save();
        return res.send(product);
   }
   catch(err){
      
      return  res.status(400).send(err.message);

       
   }
        
});



module.exports = router;
