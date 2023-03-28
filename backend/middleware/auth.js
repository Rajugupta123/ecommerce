const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    const {token} = req.cookies;
    //console.log(token);

    if(!token){
        return next(new ErrorHandler("only authenticated user can access this resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)
    next();
})

exports.authorizedRoles = (...roles)=>{

    return (req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access resources`,403))
        }
        next();
    }

    
}

//module.exports = isAuthenticatedUser;