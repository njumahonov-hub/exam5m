const { Router } = require("express");

const upload = require("../utils/multer");
const {
  addcar,
  getoneCar,
  getallCar,
  updateCar,
  deleteCar,
} = require("../controller/car.controller");
const authorization = require("../middleware/authorization");
const car_validatorMiddleware = require("../middleware/car_validator.middleware");
const auhtorization2 = require("../middleware/auhtorization2");

const carRoutes = Router();

carRoutes.post(
  "/add_car",
  authorization,
  car_validatorMiddleware,
  upload.fields([
    { name: "inside360", maxCount: 1 },
    { name: "outside360", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  addcar
);
carRoutes.get("/get_all_cars", auhtorization2, getallCar);
carRoutes.get("/get_one_car/:id",auhtorization2, getoneCar);
carRoutes.put(
  "/update_car/:id",
  authorization,
  upload.fields([
    { name: "inside360", maxCount: 1 },
    { name: "outside360", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  updateCar
);
carRoutes.delete("/delete_car/:id", authorization, deleteCar);

module.exports = carRoutes;
