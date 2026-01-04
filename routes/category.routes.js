const {Router} = require("express")
const { getallCategory, addCategory, getoneCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const authorization = require("../middleware/authorization")
const upload = require("../utils/multer")






const categoryroutes = Router()

categoryroutes.get("/get_all_category", getallCategory)
categoryroutes.post("/add_category", authorization , upload.single("file"), addCategory)
categoryroutes.get("/get_one_category/:id",  getoneCategory)
categoryroutes.put("/update_category/:id",  authorization, upload.single("file"), updateCategory)
categoryroutes.delete("/delete_category/:id", authorization, deleteCategory)

module.exports = categoryroutes 
