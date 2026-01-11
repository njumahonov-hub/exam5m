const CarSchema = require("../schema/car.schema");
const categorySchema = require("../schema/category.schema");
const CustomErrorHandle = require("../utils/custom-errorhandle");
const fs = require("fs");
const path = require("path");

const getallCategory = async (req, res, next) => {
  try {
    const category = await categorySchema.find();

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image_url = `http://localhost:4001/images/${req.file.filename}`;
    const admin_id = req.user.id;

    await categorySchema.create({ title, image_url, admin_id });

    res.status(201).json({
      message: "Added category",
      category: { title, image_url, admin_id },
    });
  } catch (error) {
    next(error);
  }
};
const getoneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categorySchema.findById(id);

    if (!category) {
      throw CustomErrorHandle.NotFound("category not found!");
    }

    const foundedcar = await CarSchema.find({ brand: id });

    res.status(200).json({ category, foundedcar });
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const category = await categorySchema.findById(id);

    if (!category) {
      throw CustomErrorHandle.NotFound("category not found!");
    }

    const updateData = { title: title || category.title };

    if (req.file) {
      if (category.image_url) {
        const oldImagePath = path.join(
          __dirname,
          "../upload/images",
          category.image_url
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updateData.image_url = `http://localhost:4001/images/${req.file.filename}`;
    }

    if (category.admin_id !== req.user.id) {
      throw CustomErrorHandle.Forbidden("You cannot update someone else's car");
    }

    const updatedCategory = await categorySchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Category updated successfully",
      category: {
        title: updatedCategory.title,
        image_url: `http://localhost:4001/images/${updatedCategory.image_url}`,
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await categorySchema.findById(id);

    if (!category) {
      throw CustomErrorHandle.NotFound("category not found!");
    }
    
     if (category.admin_id!== req.user.id) {
      throw CustomErrorHandle.Forbidden("You cannot delete someone else's car" )
       }

    await categorySchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Succesful deleted!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getallCategory,
  addCategory,
  getoneCategory,
  updateCategory,
  deleteCategory,
};
