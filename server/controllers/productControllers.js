import slugify from "slugify";
import Product from "../models/productsModel.js";
import fs from "fs";
// import upload from "../service/multer.js";

export const addProduct = async (req, res) => {
  console.log(req.fields);
  console.log(req.files);
  const { name, discription, price, category, quantity } = req.fields;
  const { images } = req.files;
  console.log(images.size);

  switch (true) {
    case !name:
      return res.status(401).json({ message: "Name is required" });
    case !discription:
      return res.status(401).json({ message: "Discription is required" });
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
    const slug = await slugify(name);
    console.log(slug);
    const product = await Product({
      ...req.fields,
      slug: slugify(name),
    });
    if (images) {
      product.images.data = fs.readFileSync(images.path);
      product.images.contentType = images.type;
    }

    const createdProduct = await product.save();
    res
      .status(200)
      .json({ message: "Successfully added product", createdProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server side error" });
  }
};

export const allProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .select("-images")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({ allProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await findOne({ slug: req.params.slug })
      .select("-images")
      .populate("category");
    return res
      .status(200)
      .json({ message: "sent product successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
