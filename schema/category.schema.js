
const { Schema, model } = require("mongoose");

const category = new Schema(
  {
    title: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      unique: [true, "Bunday brand avval kiritilgan"],
      match: [/^[a-zA-Z0-9_]+$/, "faqat harf kiriting"],
    },
    image_url: {
      type: String,
      required: true,
    },
    admin_id: {
      type: Schema.ObjectId,
      ref: "Auth"
    }
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const categorySchema = model("category", category);

module.exports = categorySchema;
