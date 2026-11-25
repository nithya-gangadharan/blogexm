const users=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.registerController=async(req,res)=>{
    console.log("inside reg controller");
    const {username,email,password}=req.body
    const existinguser=await users.findOne({email})
    if(existinguser){
        res.status(409).json({ success:false,message:"user already exists please login.",data:null})
    }
     else{
        const encryptedPassword=await bcrypt.hash(password,10)

        const newUser=await users.create({ username,email,password:encryptedPassword})
        res.status(201).json({success:true,message:"user created succesfull",data:newUser})

}
}



// login
exports.loginController=async(req,res)=>{
    console.log("inside login controller");

    const {email,password}=req.body

    const existingUser=await users.findOne({email})

    if(existingUser){
        const isPasswordMatch=await bcrypt.compare(password,existingUser.password)

        if(isPasswordMatch){
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)

            res.status(200).json({success:true,message:"login successful",data:existingUser,token})
        }
        else{
            res.status(401).json({success:false, message:"invalid password",data:null})
        }
    }
    else{
        res.status(404).json({success:false,message:"user not found",data:null})
    }
}