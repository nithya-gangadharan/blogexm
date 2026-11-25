
const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            message:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ]
},
{
    timestamps:true
})

const blogs=mongoose.model("blogs",blogSchema)

module.exports=blogs