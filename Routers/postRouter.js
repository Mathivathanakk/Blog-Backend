import express from 'express';
import {verifyToken} from '../Middlewares/verifyToken.js'
import { createPost, deletePost, getAllPost, updatePost } from '../Controllers/postController.js';


const router=express.Router()

router.post("/createpost",verifyToken,createPost)
router.get('/getposts',getAllPost)
router.delete('/deletepost/:postId/:userId',verifyToken,deletePost)
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)


export default router;
