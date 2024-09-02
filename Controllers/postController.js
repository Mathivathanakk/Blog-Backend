import Post from "../Models/postModel.js";
import { errorHandler } from "../Utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(403, "All the fields are required"));
  }
  const { title, content, image, category } = req.body;
  const newPost = new Post({ title, content, image, category });
  try {
    const savedPost = await newPost.save();
    res
      .status(200)
      .json({ message: "Post created successfully", result: savedPost });
  } catch (error) {
    next(error);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const deletePost=async(req,res,next)=>{
  try {
    
    if (!req.user.isAdmin || req.user.id !==req.params.userId) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted')

  } catch (error) {
    next(error)
  }
}



export const updatePost=async(req,res,next)=>{
  try{
    if (!req.user.isAdmin || req.user.id !==req.params.userId) {
      return next(errorHandler(403, "You are not allowed to update this post"));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  }catch(error){
    next(error)
  }
}
