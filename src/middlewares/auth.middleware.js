const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){return res.status(401).json({message : "unauthorized"})}

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(decoded.id != "admin" && decoded.id != "user"){
            res.status(401).json({message : "Invalid credentials"})
        }

        req.user = decoded 
        console.log(req.user)
    }
    catch(error){
        return res.status(401).json({message : "Invalid token"})
    }
}

module.exports = {
    authUser
}