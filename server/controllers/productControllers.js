import slugify from "slugify";
import fs from "fs";
import productsModel from "../models/productsModel.js";
// import upload from "../service/multer.js";

export const addProduct = async (req, res) => {
  console.log("Add Product Controller");
  const { name, description, price, category, quantity } = req.fields;
  const { images } = req.files;
  console.log(req.fields);

  if (!name) {
    return res.status(401).json({ message: "Name is required" });
  }
  if (!description) {
    return res.status(401).json({ message: "Description is required" });
  }
  if (!price) {
    return res.status(401).json({ message: "Price is required" });
  }
  if (!category) {
    return res.status(401).json({ message: "Category is required" });
  }
  if (!quantity) {
    return res.status(401).json({ message: "Quantity is required" });
  }

  if (!images) {
    return res.status(401).json({ message: "Image is required" });
  }
  if (images.size > 5242880) {
    return res
      .status(401)
      .json({ message: "Image is required and be under size 5MB" });
  }
  try {
    const product = await productsModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (images) {
      product.images.data = fs.readFileSync(images.path);
      product.images.contentType = images.type;
    }

    const createdProduct = await product.save();
    res.status(200).json({
      success: true,
      message: "Successfully added product",
      createdProduct,
    });

    if (createdProduct) {
      return console.log("Product Added Successfully " + createdProduct.name);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server side error" });
  }
};

export const allProducts = async (req, res) => {
  try {
    const allProducts = await productsModel
      .find({})
      .select("-images")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, allProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await productsModel
      .findOne({ slug: req.params.slug })
      .select("-images")
      .populate("category");
    return res
      .status(200)
      .json({ success: true, message: "sent product successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const imageController = async (req, res) => {
  try {
    const product = await productsModel
      .findById({ _id: req.params.pid })
      .select("images");
    await res.set("Content-Type", product.images.contentType);
    return res.status(200).send(product.images.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category, quantity } = req.fields;
  const { images } = req.files;

  switch (true) {
    case !name:
      return res.status(401).json({ message: "Name is required" });
    case !description:
      return res.status(401).json({ message: "Description is required" });
    case !price:
      return res.status(401).json({ message: "Price is required" });
    case !category:
      return res.status(401).json({ message: "Category is required" });
    case !quantity:
      return res.status(401).json({ message: "Quantity is required" });
    case !images && images.size > 5242880:
      return res
        .status(401)
        .json({ message: "Image is required and be under size 5MB" });
  }

  try {
    const product = await productsModel.findByIdAndUpdate(
      { _id: req.params.pid },
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (images) {
      product.images.data = fs.readFileSync(images.path);
      product.images.contentType = images.type;
    }

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: "Successfully added product",
      updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server side error" });
  }
};
