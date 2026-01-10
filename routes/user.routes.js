const {Router} = require("express")


const { change_pasport, add_profile, getProfile, updateProfile } = require("../controller/user.controller")
const auhtorization2 = require("../middleware/auhtorization2")

const usersecondRoutes = Router()

usersecondRoutes.post("/change_password", auhtorization2, change_pasport)
usersecondRoutes.post("/add_profile",auhtorization2, add_profile)
usersecondRoutes.get("/get_profile", auhtorization2, getProfile)
usersecondRoutes.put("/update_profile", auhtorization2, updateProfile)


module.exports = usersecondRoutes