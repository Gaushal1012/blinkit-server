const  Product  = require("../models/product");
const  Category  = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

class ProductController {

  //Get productList
  async productList(req, res) {
    //localhost:3000/api/v1/products?categories=233422,234110
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const productList = await Product.find(filter).populate("category");
    if (!productList) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(productList);
  };

  //Get all productList
  async getProductList(req, res){
    const productList = await Product.find().populate("category");
    if (!productList) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(productList);
  }


  async productListByCategory(req, res) {
    //localhost:3000/api/v1/products?categories=233422,234110
    let filter = {};
    // let category = await Category.findById(req.params.id);
    const productList = await Product.find({category:req.params.id}).populate("category");
    if (!productList) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(productList);
  };



  //Get product by Id
  async productById(req, res) {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(product);
  };

  //Post single image
  async uploadImage(req, res) {
    // router.post("/", async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).send("Invalid Category");
    }
  
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");
  
    const fileName = req.file.filename;
    // const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
    const basePath = `/upload/`;
  
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      Ingredients: req.body.Ingredients,
      Unit: req.body.Unit,
      ShelfLife: req.body.ShelfLife,
      ManufacturerDetails: req.body.ManufacturerDetails,
      MarketedBy: req.body.MarketedBy,
      FSSAILicense: req.body.FSSAILicense,
      country: req.body.country,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
      images: req.body.images,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      isFeatured: req.body.isFeatured,
    });
  
    product = await product.save();
  
    if (!product) {
      return res.status(500).send("The product cannot be created");
    }
    res.send(product);
  };

  //Delete by Id
  deleteProduct(req, res) {
    Product.findByIdAndRemove(req.params.id)
      .then((product) => {
        if (product) {
          return res
            .status(200)
            .json({ success: true, message: "The product is deleted!" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "product not found!" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  };

  //Get total product
  async totalProduct(req, res) {
    const productCount = await Product.countDocuments();
    if (!productCount) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send({ productCount: productCount });
  };

  //Get featured product
  async featuredProduct(req, res) {
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ isFeatured: true }).limit(+count);
    if (!product) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(product);
  };

  //Update imaged by Id (Post multiple images)
  async uploadImages(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { images: imagesPaths },
      { new: true }
    );

    if (!product) {
      return res.status(500).send("The product cannot be updated");
    }
    res.send(product);
  };

}

module.exports = new ProductController();
