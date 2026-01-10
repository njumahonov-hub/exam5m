const jwt = require("jsonwebtoken");
const CustomErrorHandle = require("../utils/custom-errorhandle");
const { accesstoken } = require("../utils/token");

module.exports = function (req, res, next) {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      throw CustomErrorHandle.UnAuhtorized("Refresh token not found!");
    }
    const decode = jwt.verify(refresh_token, process.env.REFSECRET_KEY);

    const payload = {
      username: decode.username,
      email: decode.email,
      role: decode.role,
      id: decode._id,
    };
    const access_token = accesstoken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });

    return res.status(200).json({
      message: "Succesful",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};
