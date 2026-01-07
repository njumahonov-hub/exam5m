const joi = require("joi");

exports.CategoryValidator = function (data) {
  try {
    const schema = joi.object({
      title: joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]{3,20}$")).required(),
      image_url: joi.string().max(50).required(),
     
    });

    return schema.validate(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
