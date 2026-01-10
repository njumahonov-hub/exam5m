
const CarSchema = require("../schema/car.schema")
const categorySchema = require("../schema/category.schema")
const CustomErrorHandle = require("../utils/custom-errorhandle")

const getMyCars = async (req, res, next) => {
  try {
    const adminId = req.user.id

    const cars = await CarSchema.find({ admin_id: adminId })

    res.status(200).json(cars)
  } catch (error) {
    next(error)
  }
}


const getMyOneCar = async (req, res, next) => {
  try {
    const { id } = req.params
    const adminId = req.user.id

    const car = await CarSchema.findOne({
      _id: id,
      admin_id: adminId
    })

    if (!car) {
      throw CustomErrorHandle.NotFound(
        "Car not found or you do not have access"
      )
    }

    res.status(200).json(car)
  } catch (error) {
    next(error)
  }
}

const getMyCategories = async (req, res, next) => {
  try {
    const adminId = req.user.id

    const categories = await categorySchema.find({ admin_id: adminId })

    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}


const getMyOneCategories = async (req, res, next) => {
  try {
    const { id } = req.params
    const adminId = req.user.id

    const Category = await categorySchema.findOne({
      _id: id,
      admin_id: adminId
    })

    if (!Category) {
      throw CustomErrorHandle.NotFound(
        "Car not found or you do not have access"
      )
    }

    res.status(200).json(Category)
  } catch (error) {
    next(error)
  }
}



module.exports = {
  getMyCars,
  getMyOneCar,
  getMyCategories,
  getMyOneCategories
}