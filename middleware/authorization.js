const jwt = require("jsonwebtoken");
const CustomErrorHandle = require("../utils/custom-errorhandle");

module.exports = function (req, res, next) {
  try {
    const accesstoken = req.cookies.access_token;

    if (!accesstoken) {
      throw CustomErrorHandle.UnAuhtorized("Access token not found!");
    }

    let decode;
    try {
      decode = jwt.verify(accesstoken, process.env.SECRET_KEY);
    } catch (err) {
      throw CustomErrorHandle.UnAuhtorized("Invalid or expired token!");
    }

    req.user = decode;

    const allowedRoles = ["admin"];
    if (!allowedRoles.includes(req.user.role)) {
      throw CustomErrorHandle.Forbidden("You are not admin");
    }

    next();
  } catch (error) {
    next(error);
  }
};
