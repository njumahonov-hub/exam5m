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


const getallCar = async (req, res, next) => {
  try {
      const cars = await CarSchema.find()

      res.status(200).json(cars)
  } catch (error){
    next(error)
  }
}

const getoneCar = async (req, res, next) => {
  try {
      const {id} = req.params
      const foundedcar = await CarSchema.findById(id)

      if(!foundedcar){
        throw CustomErrorHandle.NotFound("Car not found")
      }

      res.status(200).json(foundedcar)

  } catch (error){
    next(error)
  }
}

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    const car = await CarSchema.findById(id);
    if (!car) {
      throw CustomErrorHandle.NotFound("Car not found!");
    }

  
    let categoryId = car.brand;
    if (brand) {
      const category = await categorySchema.findOne({ title: brand });
      if (!category) {
        throw CustomErrorHandle.NotFound("Brand not found");
      }
      categoryId = category._id;
    }

    
    const images = {
      inside360: req.files?.inside360
        ? `http://localhost:4001/images/${req.files.inside360[0].filename}`
        : car.images.inside360,

      outside360: req.files?.outside360
        ? `http://localhost:4001/images/${req.files.outside360[0].filename}`
        : car.images.outside360,

      model: req.files?.model
        ? `http://localhost:4001/images/${req.files.model[0].filename}`
        : car.images.model,
    };


    const updatedCar = await CarSchema.findByIdAndUpdate(
      id,
      {
        brand: categoryId,
        car_model,
        year,
        motor,
        color,
        gearbox,
        distance,
        price,
        tanirofka: tanirofka ?? car.tanirofka,
        description: description ?? car.description,
        images,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Car = await CarSchema.findById(id);

    if (!Car) {
      throw CustomErrorHandle.NotFound("Car not found!");
    }

    await CarSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Succesful deleted!",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addcar,
  getallCar,
  getoneCar,
  updateCar,
  deleteCar

};
