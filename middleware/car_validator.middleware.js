const CustomErrorHandle = require("../utils/custom-errorhandle")
const { CarValidator } = require("../validator/car.validator")





module.exports = function(req, res, next){
    const {error} = CarValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}