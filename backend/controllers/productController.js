const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");


//create Product --Admin
exports.createProduct = async(req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

//Get All Product
exports.getAllProducts = async(req,res)=>{

    const products = await Product.find();

    res.status(200).json({
        //message:"Route is working Fine"
        success:true,
        products
    })
} 

//Get Single Product or Product Details.
exports.getSingleProduct = async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));         
    }
    res.status(200).json({
        success:true,
        product
    })

}


//Update Product -- Admin
exports.updateProduct = async(req,res,next)=>{
    
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
}

// Delete Product
exports.deleteProduct = async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));         
    }    
    
    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })

}