const {Router} = require("express")
const { getallCategory, addCategory, getoneCategory, updateCategory, deleteCategory } = require("../controller/category.controller")
const authorization = require("../middleware/authorization")
const upload = require("../utils/multer")
const category_validatorMiddlware = require("../middleware/category_validator.middlware")
const auhtorization2 = require("../middleware/auhtorization2")




const categoryroutes = Router()

categoryroutes.get("/get_all_category", auhtorization2, getallCategory)
categoryroutes.post("/add_category",category_validatorMiddlware, authorization , upload.single("file"), addCategory)
categoryroutes.get("/get_one_category/:id", auhtorization2, getoneCategory)
categoryroutes.put("/update_category/:id",  authorization, upload.single("file"), updateCategory)
categoryroutes.delete("/delete_category/:id", authorization, deleteCategory)

module.exports = categoryroutes 
