import Product from "./../models/products-model.js";
import upload from "./../service/multer.js";

export const addProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const { name, discription, price, category, quantity } = req.body;

  try {
    await upload.array("images");
    const images = await req.files.map((file) => file.filename);
    await Product.create({
      name,
      discription,
      price,
      category,
      images,
      quantity,
    });
    res.status(200).json({ message: "Successfully added product" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server side error" });
  }
};

export const showAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ allProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
