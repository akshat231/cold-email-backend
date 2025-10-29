const joi = require('joi');
const logger = require('../utilities/logger');
const ApiResponse = require('../utilities/apiResponse');

const insertMailValidator = joi.object({
    mail:joi.string().required(),
    company: joi.string().required()
})

const insertEmailValidator = (req, res, next) => {
    try {
        const { error } = insertMailValidator.validate(req.body);
        if (error) {
            logger.error(`Validation error: ${error.message}`);
           return ApiResponse.error('Validation error', 422, error.message).send(res);
        }
        next();
    } catch (error) {
        logger.error('Error in Mail Validator: ', error);
        next(error);
    }
};

module.exports = {
    insertEmailValidator
}

