const jwt = require("jsonwebtoken")
const CustomErrorHandle = require("./custom-errorhandle")

const accesstoken = (payload) => {
    try {
      return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:"15m"})
    } catch (error) {
      throw CustomErrorHandle.BadRequest(error.message)
    }
  
}
const refreshtoken = (payload) => {
    try {
      return jwt.sign(payload, process.env.REFSECRET_KEY, {expiresIn:"15d"})
    } catch (error) {
      throw CustomErrorHandle.BadRequest(error.message)
    }
  
}
module.exports = {
    accesstoken,
    refreshtoken
}