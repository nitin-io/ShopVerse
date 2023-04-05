import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import slugyfy from "slugify";

// Create

export const createCategory = async (req, res) => {
  console.log(req.body);
  const name = req.body.newCategory;
  try {
    const category = await categoryModel.findOne({ name });

    if (category) {
      return res.status(309).json({ message: "Category already exist." });
    }

    await categoryModel.create({ name, slug: slugyfy(name) });
    return res
      .status(201)
      .json({ success: true, message: "Successfully created category" });
  } catch (error) {
    console.log(`Error in category: ${error}`.bgRed.white);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Read All

export const readCategories = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    return res
      .status(200)
      .json({ success: true, message: "Category sent", allCategories });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
};

// Read One

export const singleCategory = async (req, res) => {
  try {
    const doc = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).json({ doc, message: "Sent category successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update

export const updateCategory = async (req, res) => {
  console.log(req.body);
  try {
    const newName = req.body.name;
    const id = req.params.id;
    const newDoc = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: newName,
        slug: slugify(newName),
      },
      { new: true }
    );
    console.log(newDoc);
    return res
      .status(201)
      .json({ success: true, message: "Successfully update." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error, please try again later",
      error,
    });
  }
};

// Delete

export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await categoryModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in deleting" });
  }
};
