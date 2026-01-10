const {Router}= require("express")
const {
  getMyCars,
  getMyOneCar,
  getMyCategories,
  getMyOneCategories,

} = require("../controller/admin.controller")
const authorization = require("../middleware/authorization")


const adminRoutes = Router()


adminRoutes.get("/admin_get_all_cars", authorization,  getMyCars)
adminRoutes.get("/admin_get_one_car/:id", authorization,  getMyOneCar)
adminRoutes.get("/admin_get_all_categories", authorization,  getMyCategories)
adminRoutes.get("/admin_get_one_categories/:id", authorization,  getMyOneCategories)


module.exports = adminRoutes