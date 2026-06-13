const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

async function registerUser(req, res){
    const {name, email, password, role="user"} = req.body

    const isUserExists = await userModel.findOne({
        $or:[
            {name}, 
            {email}
        ]
    })

    if(isUserExists){return res.status(401).json({message:"user already exists"})}

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name, 
        email, 
        password:hash,
        role
    })

   const token = jwt.sign({
    id:user._id,
    role:user.role
   },process.env.JWT_SECRET_KEY)

  res.cookie("userToken", token)

    res.status(201).json({
        message:"user register successfully",
        id:user.id,
        name:user.name,
        password:user.password,
        role:user.role,
        token
    })

}
async function loginUser(req, res){
    const {name , email , password} = req.body

    const user = await userModel.findOne({
        $or:[
            {name},
            {email}
        ]
    })

    if(!user){return res.status(401).json({message : "invalid credentials"})}

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){return res.status(401).json({message : "invalid password"})}

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET_KEY)

    req.cookie("loginToken", token)

    res.status(201).json({
        message : "user logiin succesfully",
     id:user.id,
     name:user.name,
     email:user.email,
     password:user.password,
     role:user.role
    })
}

module.exports = {
    registerUser,
    loginUser
}