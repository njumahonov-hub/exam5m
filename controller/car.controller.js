const CarSchema = require("../schema/car.schema");
const categorySchema = require("../schema/category.schema");
const CustomErrorHandle = require("../utils/custom-errorhandle");

const addcar = async (req, res, next) => {
  try {
    const {
      brand,
      car_model,
      year,
      motor,
      color,
      gearbox,
      distance,
      price,
      tanirofka,
      description,
    } = req.body;

      const category = await categorySchema.findOne({ title: brand });
    if (!category) {
        
      throw CustomErrorHandle.NotFound( "Brand topilmadi" );
    }
    
  
    const images = {
      inside360: req.files?.inside360
        ? `http://localhost:4001/images/${req.files.inside360[0].filename}`
        : "",
      outside360: req.files?.outside360
        ? `http://localhost:4001/images/${req.files.outside360[0].filename}`
        : "",
      model: req.files?.model
        ? `http://localhost:4001/images/${req.files.model[0].filename}`
        : "",
    };

    await CarSchema.create({
      brand: category._id,
      car_model,
      year,
      motor,
      color,
      gearbox,
      distance,
      price,
      tanirofka: tanirofka || false,
      description: description || "",
      images,
    });

    res.status(201).json({
      message: "Added car",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addcar,
};
