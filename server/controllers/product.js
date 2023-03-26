const Product = require("./../models/products-model");

const addProduct = async (req, res) => {
    console.log(req.body);
    const {name, discription, price, category, quantity} = req.body;

    try {
        await Product.create({name, discription, price, category, quantity});
        res.status(200).json({message: "Successfully added product"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server side error"});
    }

}

const showAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({allProducts});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "internal server error"});
    }
}

module.exports = {addProduct, showAllProducts};