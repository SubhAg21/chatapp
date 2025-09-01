import jwt from "jsonwebtoken";
import User from "../models/user_model.js"

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"No token , authorization denied"});
        }
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decode){
            return res.status(401).json({error:"Invalid Token"});
        }
        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(401).json({error:"User Not Found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default secureRoute