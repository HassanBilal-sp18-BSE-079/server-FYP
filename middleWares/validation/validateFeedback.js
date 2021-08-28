let { validationFeedback } = require("../../model/feedbackModel");

let validateFeedback = (req, res, next) => {


	let { error } = validationFeedback(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	next();
};

module.exports.validation = validateFeedback;
