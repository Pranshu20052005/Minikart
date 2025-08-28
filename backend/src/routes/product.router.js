const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});



router.post("/add", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagekit = new ImageKit({
      publicKey: process.env.publicKey,
      privateKey: process.env.privateKey,
      urlEndpoint: process.env.urlEndpoint,
    });

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      isPrivateFile: false,
      isPublished: true
    });

    const imageUrl = result.url;

    const { title, description, category, price } = req.body;
    
    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new productModel({
      title: title,
      description: description,
      category: category,
      price: price,
      image: imageUrl
    });

    await product.save();

    res.status(201).json({ 
      message: "Product added successfully", 
      product: product 
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ 
      message: "Error adding product", 
      error: error.message 
    });
  }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found" 
            });
        }
        res.status(200).json({ 
            success: true,
            product 
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching product", 
            error: error.message 
        });
    }
});

router.get("/update/:id", async(req, res)=>{

    const productId = req.params.id

    const product = await productModel.findById(productId)


    res.render("updateForm",{product : product})
})


router.post("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const productId = req.params.id;
        const { title, description, category, price } = req.body;

        // Validate required fields
        if (!title || !description || !category || !price) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const updateData = {
            title,
            description,
            category,
            price,
            updatedAt: new Date()
        };

        // Only handle image upload if a new image was provided
        if (req.file) {
            const imagekit = new ImageKit({
                publicKey: process.env.publicKey,
                privateKey: process.env.privateKey,
                urlEndpoint: process.env.urlEndpoint,
            });

            const result = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                isPrivateFile: false,
                isPublished: true
            });

            updateData.image = result.url;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });
        
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
})


router.get("/delete/:id" , async (req,res)=>{
    const productId = req.params.id

    await productModel.findByIdAndDelete(productId)

    res.redirect("/")
})



module.exports = router;
