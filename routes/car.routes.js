const { Router } = require("express");

const upload = require("../utils/multer");
const { addcar } = require("../controller/car.controller");
const authorization = require("../middleware/authorization");
const car_validatorMiddleware = require("../middleware/car_validator.middleware");

const carRoutes = Router();

carRoutes.post( "/add_car", authorization, car_validatorMiddleware, upload.fields([
    { name: "inside360", maxCount: 1 },
    { name: "outside360", maxCount: 1 },
    { name: "model", maxCount: 1 },
  ]),
  addcar
);

module.exports = carRoutes;
