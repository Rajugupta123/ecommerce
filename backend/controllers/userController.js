const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")


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


// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
   
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    //generating forgot password email link
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password reset token is:- \n\n ${resetPasswordUrl} \n\n If you havenot requested this email then,please ignore it`;

    try {
        
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message,500))

    }
})

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}  
        
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or expired",400))
    }

    //confirm password
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnot match",400))
    }

    //if valid user and valid token
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    //redirected to login
    sendToken(user,200,res)

}) 

//Get User Details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

//update User Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }
    
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password doesnot match",400))

    }

    user.password = req.body.newPassword;
    
    await user.save()

    sendToken(user,200,res)

})


//Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    //adding avatar lateron (cloudinary)

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
        
        
    })

    res.status(200).json({
        success:true,
    })

})


//Get All User Details  (Admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
})

//Get Single User (Admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
       return next (new ErrorHandler(`user doesnot exists with id:${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
        return next(
          new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
      }
  
    res.status(200).json({
      success: true,
    });
  });
 
  
// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
   
  
    await user.remove();
    
    
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
   