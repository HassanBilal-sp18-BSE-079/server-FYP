let mongoose = require("mongoose");
let joi = require("@hapi/joi");

let laptopsSchema = mongoose.Schema({
	title: String,
	price: Number,
	quantity: Number,
	discription: {
		RAM: String,
		CPU: String,
		GPU: String,
		Charger: String,
		Battery: String,
		MotherBoard: String,
		HardDrive: String,
		Size: String,
		Fans: String,
	},
	model: String,
	type: String,
	image: {
		thumbnail: String,
		gallery: Array,
	},
});

let laptopsModel = mongoose.model("laptops", laptopsSchema);

let validation = (data) => {
	const schema = joi.object({
		title: joi.string().required(),
		price: joi.number().required(),
		quantity: joi.number().required(),

		RAM: joi.string().required(),
		CPU: joi.string().required(),
		GPU: joi.string().required(),
		Charger: joi.string().required(),
		Battery: joi.string().required(),
		MotherBoard: joi.string().required(),
		HardDrive: joi.string().required(),
		Size: joi.string().required(),
		Fans: joi.string().required(),

		model: joi.string().required(),
		type: joi.string().required(),
		thumbnail: joi.string().required(),
		gallery: joi.array().required(),
	});

	return schema.validate(data, { abortEarly: false });
};

module.exports.Laptops = laptopsModel;
module.exports.validationLaptops = validation;
