var express = require("express");
var router = express.Router();
let { Laptops } = require("../../model/laptopsModel");
let { validation,validationUpdated } = require("../../middleWares/validation/validateLaptops");
let multer = require("multer");
let fs = require("fs");

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let dir = "./client/public/uploads/laptops";

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString().replace(/:/g, ".") + file.originalname);
	},
});

let fileFilter = (res, file, cb) => {
	if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		cb(null, true);
	} else {
		cb(new Error("File is not of type jpg or jpeg"), false);
	}
};

let upload = multer({ storage: storage, fileFilter: fileFilter });






/* GET pre-built PCs. */
router.get("/", async (req, res) => {
	let laptops = await Laptops.find();

	return res.send(laptops);
});




//get singel product

router.get("/:id", async (req, res) => {
	try {
		let product = await Laptops.findById(req.params.id);
		if (!product) return res.send("Product not present for given ID");
		return res.send(product);
	} catch (err) {
		return res.send("Invalid Id");
	}
});



//Delete product

router.delete("/:id", async (req, res) => {
	let product1 = await Laptops.findById(req.params.id);
	let dir = "./client/public/uploads/laptops/";

	if(fs.existsSync(dir + product1.image.thumbnail )){

		fs.unlinkSync(dir + product1.image.thumbnail);

		for (let index in product1.image.gallery) {
			fs.unlinkSync(dir + product1.image.gallery[index]);
		}
	}



	let product = await Laptops.findByIdAndDelete(req.params.id);

	return res.send(product);
});

//update product

router.put(
	"/:id",
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "gallery", maxCount: 6 },
	]),
	validationUpdated,
	async (req, res) => {

		let product = await Laptops.findById(req.params.id);
        if(!product){
            return res.status(400).send("Product not present for given ID")
        }

        console.log(req.files);

        if(req.files.thumbnail && req.files.gallery){
       
			product.title = req.body.title;
			product.price = req.body.price;
			product.quantity = req.body.quantity;
			product.discription.RAM = req.body.RAM;
			product.discription.CPU = req.body.CPU;
			product.discription.GPU = req.body.GPU;
			product.discription.Charger = req.body.Charger;
			product.discription.Battery = req.body.Battery;
			product.discription.MotherBoard = req.body.MotherBoard;
			product.discription.HardDrive = req.body.HardDrive;
			product.discription.Size = req.body.Size;
			product.discription.Fans = req.body.Fans;
			product.model = req.body.model;
			product.type = req.body.type;
            
            product.image.thumbnail = req.files.thumbnail[0].filename;
            product.image.gallery = [];
            for (let index in req.files.gallery){
                product.image.gallery[index] = req.files.gallery[index].filename;
            }

            console.log('thumbnail,gallery');
    
        }
        else if(req.files.thumbnail || req.files.gallery ){
            if(req.files.thumbnail){
            	product.title = req.body.title;
			product.price = req.body.price;
			product.quantity = req.body.quantity;
			product.discription.RAM = req.body.RAM;
			product.discription.CPU = req.body.CPU;
			product.discription.GPU = req.body.GPU;
			product.discription.Charger = req.body.Charger;
			product.discription.Battery = req.body.Battery;
			product.discription.MotherBoard = req.body.MotherBoard;
			product.discription.HardDrive = req.body.HardDrive;
			product.discription.Size = req.body.Size;
			product.discription.Fans = req.body.Fans;
			product.model = req.body.model;
			product.type = req.body.type;
                
                product.image.thumbnail = req.files.thumbnail[0].filename;
                 product.image.gallery =product.image.gallery;
                
            }
            else if(req.files.gallery){
				product.title = req.body.title;
				product.price = req.body.price;
				product.quantity = req.body.quantity;
				product.discription.RAM = req.body.RAM;
				product.discription.CPU = req.body.CPU;
				product.discription.GPU = req.body.GPU;
				product.discription.Charger = req.body.Charger;
				product.discription.Battery = req.body.Battery;
				product.discription.MotherBoard = req.body.MotherBoard;
				product.discription.HardDrive = req.body.HardDrive;
				product.discription.Size = req.body.Size;
				product.discription.Fans = req.body.Fans;
				product.model = req.body.model;
				product.type = req.body.type;
            
            product.image.thumbnail = product.image.thumbnail;
            product.image.gallery = [];
            for (let index in req.files.gallery){
                product.image.gallery[index] = req.files.gallery[index].filename;
            }
            console.log('gallery');
            }
            
        }
        else{
			product.title = req.body.title;
			product.price = req.body.price;
			product.quantity = req.body.quantity;
			product.discription.RAM = req.body.RAM;
			product.discription.CPU = req.body.CPU;
			product.discription.GPU = req.body.GPU;
			product.discription.Charger = req.body.Charger;
			product.discription.Battery = req.body.Battery;
			product.discription.MotherBoard = req.body.MotherBoard;
			product.discription.HardDrive = req.body.HardDrive;
			product.discription.Size = req.body.Size;
			product.discription.Fans = req.body.Fans;
			product.model = req.body.model;
			product.type = req.body.type;
            
            product.image.thumbnail = product.image.thumbnail;
            product.image.gallery= product.image.gallery;

            console.log('both not present');
            
        }

        await product.save();
        console.log(product);
        return res.send(product);


	
	}
);

// Add item

//restrict picture selection in front end gallery=6

router.post(
	"/",
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "gallery", maxCount: 6 },
	]),
	validation,
	async (req, res) => {
		try {
			let product = new Laptops();

			product.title = req.body.title;
			product.price = req.body.price;
			product.quantity = req.body.quantity;
			product.discription.RAM = req.body.RAM;
			product.discription.CPU = req.body.CPU;
			product.discription.GPU = req.body.GPU;
			product.discription.Charger = req.body.Charger;
			product.discription.Battery = req.body.Battery;
			product.discription.MotherBoard = req.body.MotherBoard;
			product.discription.HardDrive = req.body.HardDrive;
			product.discription.Size = req.body.Size;
			product.discription.Fans = req.body.Fans;
			product.model = req.body.model;
			product.type = req.body.type;

			product.image.thumbnail = req.files.thumbnail[0].filename;
			for (let index in req.files.gallery) {
				product.image.gallery[index] = req.files.gallery[index].filename;
			}

			await product.save();
			return res.send(product);
		} catch (err) {
			res.send("something went wrong");
		}
	}
);

module.exports = router;
