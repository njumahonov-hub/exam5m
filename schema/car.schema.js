const { required } = require("joi");
const { Schema, model } = require("mongoose");

const carsSchema = new Schema(
  {
    brand: {
      type: Schema.ObjectId,
      ref: "category",
      required: true,
    },
    car_model: {
        type: String,
        required: true
    },

    year: {
      type: Number,
      required: true,
      min: [1900, "Yili noto‘g‘ri"],
      max: [new Date().getFullYear(), "Yili noto‘g‘ri"],
    },

    motor: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    gearbox: {
      type: String,
      required: true,
      enum: ["AT", "MT", "CVT", "AMT"],
    },

    distance: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    tanirofka: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
    },

    images: {
      inside360: {
        type: String,
      },
      outside360: {
        type: String,
      },
      model: {
        type: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CarSchema = model("car", carsSchema);

module.exports = CarSchema;
