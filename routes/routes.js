const express=require('express')
const router=new express.Router()

const userController=require('../controller/userController')
const authMiddleware=require('../middleware/authMiddleware')
const blogController=require('../controller/blogController')
// register
router.post('/register',userController.registerController)
router.post('/login',userController.loginController)

router.get('/profile',authMiddleware,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"authorization successful",
        data:{
            userId:req.payload
        }
    })
})

router.post('/create-blog',authMiddleware,blogController.createBlogController)
router.get('/all-blogs',blogController.getAllBlogsController)
router.put('/update-blog/:id',authMiddleware,blogController.updateBlogController)
router.delete('/delete-blog/:id',authMiddleware,blogController.deleteBlogController)


router.post('/add-comment/:id',authMiddleware,blogController.addCommentController)
module.exports=router