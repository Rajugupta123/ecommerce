const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register A User.
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profile pic Url"
        }
    })

    sendToken(user,201,res);

    // //jwt token
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     //user
    //     token
    // })

})


//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given both email and password.
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }

    //getting user value from the database.
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    sendToken(user,200,res);

})


// Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
})
