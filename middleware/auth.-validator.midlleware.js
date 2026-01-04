const CustomErrorHandle = require("../utils/custom-errorhandle")
const { AuthValidator } = require("../validator/auth.validator")



module.exports = function(req, res, next){
    const {error} = AuthValidator(req.body)

    if(error){
      throw CustomErrorHandle.BadRequest(error.message)
    }

    next()
}