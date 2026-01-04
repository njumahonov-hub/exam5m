const nodemailer = require("nodemailer")
const CustomErrorHandle = require("./custom-errorhandle")


module.exports =async function(code, email){
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "njumahonov@gmail.com",
            pass: process.env.APP_KEY
        }
      })

      await transporter.sendMail({
        from: "njumahonov@gmail.com",
        to: email,
        subject: "Liblary verification",
        text: "Ushbu habarda tasdiqlash kodi keltirilgan",
        html: `<b>${code}</b>`
      })
    } catch (error){
        throw CustomErrorHandle.BadRequest(error.message)
    }
}