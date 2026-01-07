const CustomErrorHandle = require("../utils/custom-errorhandle")
const { CategoryValidator } = require("../validator/category.validator")




module.exports = function(req, res, next){
    const {error} = CategoryValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}