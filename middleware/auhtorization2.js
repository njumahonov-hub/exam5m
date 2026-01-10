const jwt = require("jsonwebtoken")
const CustomErrorHandle = require("../utils/custom-errorhandle")


module.exports = function (req, res, next)  {
    try {
    const accesstoken =  req.cookies.access_token

     if(!accesstoken){
        throw CustomErrorHandle.UnAuhtorized("Access token not found!")
     }
     const decode = jwt.verify(accesstoken, process.env.SECRET_KEY)
      req.user = decode
      

      next()
    } catch (error) {
      next(error)
    }
}
