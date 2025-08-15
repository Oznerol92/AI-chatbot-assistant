const { body, validationResult } = require("express-validator");
const logger = require("../services/logger");

const validateRequest = (validations) => async (req, res, next) => {
	await Promise.all(validations.map((validation) => validation.run(req)));

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		logger.warn(`Validation errors: ${JSON.stringify(errors.array())}`);
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = validateRequest;
