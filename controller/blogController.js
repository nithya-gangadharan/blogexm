const blogs=require('../models/blogModel')

// create blog
exports.createBlogController=async(req,res)=>{
    console.log("inside create blog controller");

    const {title,description}=req.body

    const newBlog=await blogs.create({title,description,author:req.payload})

    res.status(201).json({success:true,message:"Blog created successfully",data:newBlog
    })
}
// get all blogs
exports.getAllBlogsController=async(req,res)=>{
    console.log("inside get all blogs controller");

    const allBlogs=await blogs.find()

    res.status(200).json({success:true,message:"All blogs fetched successfully",data:allBlogs})
}
// update blog
exports.updateBlogController=async(req,res)=>{
    console.log("inside update blog controller");

    const {title,description}=req.body
    const {id}=req.params

    const blog=await blogs.findById(id)

    if(blog){
        if(blog.author==req.payload){
            const updatedBlog=await blogs.findByIdAndUpdate(id,{title,description},{new:true})

            res.status(200).json({ success:true,message:"Blog updated successfully",data:updatedBlog })
        }
        else{
            res.status(403).json({success:false,message:"You are not authorized to update this blog",data:null})
        }
    }
    else{
        res.status(404).json({success:false,message:"Blog not found",data:null})
    }
}
// delete blog
exports.deleteBlogController=async(req,res)=>{
    console.log("inside delete blog controller");

    const {id}=req.params

    const blog=await blogs.findById(id)

    if(blog){
        if(blog.author==req.payload){
            await blogs.findByIdAndDelete(id)

            res.status(200).json({success:true,message:"Blog deleted successfully",data:null})
        }
        else{
            res.status(403).json({success:false,message:"You are not authorized to delete this blog",data:null})
        }
    }
    else{
        res.status(404).json({success:false,message:"Blog not found",data:null})
    }
}

// add comment
exports.addCommentController=async(req,res)=>{
    console.log("inside add comment controller");

    const {message}=req.body
    const {id}=req.params

    const blog=await blogs.findById(id)

    if(blog){
        blog.comments.push({user:req.payload,message })

        await blog.save()

        res.status(200).json({success:true,message:"Comment added successfully",data:blog})
    }
    else{
        res.status(404).json({success:false,message:"Blog not found",data:null})
    }
}