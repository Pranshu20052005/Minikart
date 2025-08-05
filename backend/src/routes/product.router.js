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

router.get("/:id",async (req, res)=>{
    const productId = req.params.id

    const product = await productModel.findById(productId)

    console.log(product);


    res.status(200).json({message : "data mil gya " , product})
    
})

router.get("/update/:id", async(req, res)=>{

    const productId = req.params.id

    const product = await productModel.findById(productId)


    res.render("updateForm",{product : product})
})


router.post("/update/:id",upload.single("image") ,async(req, res)=>{

    const productId = req.params.id

    console.log(req.body);
    
  const { title, description, category, price } = req.body;

  
  const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint,
  });


  const result = await imagekit.upload({
    file : req.file.buffer,
    fileName : req.file.originalname,
    isPrivateFile : false,
    isPublished : true
  })

  const imageUrl = result.url

    await productModel.findByIdAndUpdate(productId,{
    title : title,
    description : description,
    category : category,
    price : price,
    image : imageUrl
  })

  res.redirect(`/products/${productId}`)
    
})


router.get("/delete/:id" , async (req,res)=>{
    const productId = req.params.id

    await productModel.findByIdAndDelete(productId)

    res.redirect("/")
})



module.exports = router;
