const Post = require("../models/post")

const getAllPosts = async(req,res)=>{
    const posts=await Post.find({})
    if(!posts) return res.status(204).json({'errMessage':'there are no posts'})
    res.json(posts);
}

const addPost = async(req,res)=>{
    const data=req.body;
    console.log(data);
    try{
        await Post.create(data)
        return res.json({'message':'success'});
    }catch(err){
        console.log(err)
        return res.json({'message':err.message});
    }
}
const deletePost = async(req,res)=>{
    const data=req.body;
    console.log(data);
    try{
        Post.find({id:data._id}).remove().exec();
        return res.json({'message':'success'});
    }catch(err){
        console.log(err)
        return res.json({'message':err.message});
    }
}

module.exports={
    getAllPosts,
    addPost,
    deletePost
}