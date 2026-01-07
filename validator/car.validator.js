const Joi = require("joi");

exports.CarValidator = function (data) {
     try {
  const schema = Joi.object({
    brand: Joi.string().trim().required(), 
    car_model: Joi.string().trim().min(2).max(50).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    motor: Joi.string().trim().required(),
    color: Joi.string().trim().required(),
    gearbox: Joi.string().valid("AT", "MT", "CVT", "AMT").required(),
    distance: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    tanirofka: Joi.boolean().optional(),
    description: Joi.string().max(500).optional(),
   
  });

  return schema.validate(data); 
    } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
