
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const config = require("../config");

// get token 

exports.getToken = (user)=>{
    return jwt.sign(user , config.secretKey , {expiresIn : 3600});
}


// vrify token
exports.verifyToken = (token)=>{
    try{
    const user = jwt.verify(token , config.secretKey);
    return user;
    }
    catch (err) {
        throw new Error("Not valid token")
    }


}
// end of get token


