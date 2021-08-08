var express = require('express');
var router = express.Router();
let {PreBuiltDesktop} = require('../../model/prebuiltDesktopModel');
let {validation} = require('../../middleWares/validation/validatePreBuiltDesktop');
let multer = require('multer');
let fs = require('fs');
let {auth} = require('../../middleWares/authentication/auth');
let adminAuth = require('../../middleWares/authentication/adminAuth');






let storage = multer.diskStorage( {
destination:(req,file,cb)=>{

    let dir = './client/uploads/preBuiltpc';

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













let upload = multer({storage:storage, fileFilter: fileFilter });



/* GET pre-built PCs. */
router.get('/',auth,adminAuth, async (req, res)=> {
  
    let products = await PreBuiltDesktop.find();

    return res.send(products);

});



//get singel product

router.get('/:id', async (req, res)=> {

    try{
        let product = await PreBuiltDesktop.findById(req.params.id);
        if(!product) return res.send("Product not present for given ID")
    return res.send(product);
    }
    catch(err){
        return res.send('Invalid Id');

    }
    
});


//Delete product


router.delete('/:id', async (req, res)=> {


 
    let product1 = await PreBuiltDesktop.findById(req.params.id);
   
    fs.unlinkSync('./client/uploads/' + product1.image.thumbnail);

    for (let index in product1.image.gallery){
        fs.unlinkSync('./client/uploads/' + product1.image.gallery[index]);
    }

    let product = await PreBuiltDesktop.findByIdAndDelete(req.params.id);

    return res.send(product);
});


//update product

router.put('/:id', upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'gallery', maxCount: 6 }]) , validation , async (req, res)=> {
    try{
        let product = await PreBuiltDesktop.findById(req.params.id);
        if(!product){
            return res.status(400).send("Product not present for given ID")
        }

        product.title = req.body.title;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.discription.RAM = req.body.RAM;
        product.discription.CPU = req.body.CPU;
        product.discription.GPU = req.body.GPU;
        product.discription.PSU = req.body.PSU;
        product.discription.MotherBoard = req.body.MotherBoard;
        product.discription.HardDrive = req.body.HardDrive;
        product.discription.Casing = req.body.Casing;
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

    try{let product = new PreBuiltDesktop();

        product.title = req.body.title;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.discription.RAM = req.body.RAM;
        product.discription.CPU = req.body.CPU;
        product.discription.GPU = req.body.GPU;
        product.discription.PSU = req.body.PSU;
        product.discription.MotherBoard = req.body.MotherBoard;
        product.discription.HardDrive = req.body.HardDrive;
        product.discription.Casing = req.body.Casing;
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
       res.send('something went wrong');
   }
        
});



// router.post('/muiliplepics',upload.fields([{ name: 'thumbnail', maxCount: 1 },{ name: 'gallery', maxCount: 6 }]), async (req,res)=>{

    
//         let product = new PreBuiltDesktop();

//       console.log(req.files.gallery[0].filename)
    
//       product.image.thumbnail = req.files.thumbnail[0].filename;
//         for (let index in req.files.gallery){
//             console.log(index)
//             product.image.gallery[index] = req.files.gallery[index].filename;
//         }
    
//         await product.save();
//         return res.send(product);
    
    

    
   
// });


module.exports = router;
