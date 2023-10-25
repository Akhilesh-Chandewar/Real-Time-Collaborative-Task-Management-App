const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('pending', 'completed').default('pending').required(),
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming it's a valid ObjectId
});

module.exports = taskValidationSchema;