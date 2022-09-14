const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const User=require('../models/user');

const getAllUsers = async(req,res)=>{
    const users=await User.find({})
    if(!users) return res.status(204).json({'errMessage':'there are no users'})
    res.json(users);
}

const loginUser = asyncHandler(async (req,res)=>{
    const {username,password}=req.body

    const user = await User.findOne({username});

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            firstname:"Elyes",
            lastName:"Kacem",
            username:"kacem.e",
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

const register = asyncHandler(async (req, res) => {

    // Hashing password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("1234578",salt);


    const user=await User.create({
        firstname:"Elyes",
        lastName:"Kacem",
        username:"kacem.e",
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
        firstname:"Elyes",
        lastName:"Kacem",
        username:"kacem.e",
        token:generateToken(user._id)
        })
    }
})

const generateToken = (id) => {
    // console.log(process.env.JWT_SECRET)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports={
    getAllUsers,
    register,
    loginUser
}