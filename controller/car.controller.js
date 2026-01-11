const CarSchema = require("../schema/car.schema");
const categorySchema = require("../schema/category.schema");
const SavedSchema = require("../schema/saved.schema");
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
        
      throw CustomErrorHandle.NotFound( "Brand not found" );
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
      admin_id: req.user.id

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
    const { id } = req.params
    const user_id = req.user.id

    const foundedcar = await CarSchema.findById(id)
    if (!foundedcar) {
      throw CustomErrorHandle.NotFound("Car not found")
    }

    let saved = false
    if (user_id) {
      const isSaved = await SavedSchema.findOne({ car_id: id, user_id })
      saved = !!isSaved
    }

    
    const savedCount = await SavedSchema.countDocuments({ car_id: id })

    res.status(200).json({
      car: foundedcar,
      saved,
      savedCount
    })

  } catch (error) {
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
      admin_id
    } = req.body;

    const car = await CarSchema.findById(id);
    if (!car) {
      throw CustomErrorHandle.NotFound("Car not found!");
    }
    if (car.admin_id!== req.user.id) {
      throw CustomErrorHandle.Forbidden("You cannot update someone else's car" )
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
     
     if (Car.admin_id!== req.user.id) {
      throw CustomErrorHandle.Forbidden("You cannot delete someone else's car" )
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
