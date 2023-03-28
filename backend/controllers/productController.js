const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create Product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}) 

//Get All Product
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{

    const resultPerPage = 5;
    //later at frontend
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        //message:"Route is working Fine"
        success:true,
        products,
        productCount
    })
})

//Get Product Details or Single Product.
exports.getSingleProduct = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));         
    }
    res.status(200).json({
        success:true,
        product,
        // this is where productCnt to be used by later on
    })

})


//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    
    let product = await Product.findById(req.params.id);

    // if(!product){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Product Not Found"
    //     })
    // }

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));         
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

// Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));         
    }    
    
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })

})