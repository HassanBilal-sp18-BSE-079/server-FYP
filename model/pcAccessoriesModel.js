const mongoose = require("mongoose");
const joi = require("@hapi/joi");

let pcAccessoriesSchema = mongoose.Schema({
	title: String,
	price: Number,
	quantity: Number,
	model: String,
	type: String,
	image: {
		thumbnail: String,
		gallery: Array,
	},
	discription: {
		PowerConsumption: String,
	},
});

let pcAccessoriesModel = mongoose.model("pcAccessories", pcAccessoriesSchema);

let validation = (data) => {
	const schema = joi.object({
		title: joi.string().min(2).required(),
		price: joi.number().min(0).required(),
		quantity: joi.number().min(0).required(),
		model: joi.string().min(3).required(),
		type: joi.string().min(3).required(),

		thumbnail: joi.string().required(),
		gallery: joi.array().required(),

		PowerConsumption: joi.string().required(),
	});

	return schema.validate(data, { abortEarly: false });
};

module.exports.PcAccessories = pcAccessoriesModel;
module.exports.validationPcAccessories = validation;
