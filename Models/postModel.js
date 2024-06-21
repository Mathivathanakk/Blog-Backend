import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
content:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true,
    unique:true
},
image:{
    type:String,
    default:"https://png.pngtree.com/png-vector/20220810/ourmid/pngtree-blogging-concept-picture-writer-laptop-png-image_5722986.png"
},
category:{
    type:String,
    default:"uncategorized"
}

},{timestamps:true})


const Post=mongoose.model("Post",postSchema)
export default Post;