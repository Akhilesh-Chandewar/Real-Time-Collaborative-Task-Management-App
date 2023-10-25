const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'regular').default('regular'),
    project: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming it's a valid ObjectId
});

module.exports = userValidationSchema;