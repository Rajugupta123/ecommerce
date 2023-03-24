const mongoose = require("mongoose");

const productSchema = new(mongoose.Schema)({
    name:{
        type:String,
        required:[true,"please Enter the Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter the Product Description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter the Product Price"],
        maxLength:[8,"Price cannot exceeds 8 figures"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Prdouct Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[4,"stock cannot exceeds 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }    


})


module.exports = mongoose.model("product",productSchema);