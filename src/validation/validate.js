const User = require("../models/userModel");

module.exports.varifyUsername = async (username) => {
    if (username === "") {
        return {
            isError: true,
            error: "Must not empty username!"
        }
    }
    const user = await User.findOne({
        username: username
    });
    if (user) {
        return {
            isError: true,
            error: "user already Register"
        }
    }
    return {
        isError: false
    }
}
module.exports.verifyEmail = async (email) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (email === "" || !regexEmail.test(email)) {
        return {
            isError: true,
            error: "invalid email"
        }
    }
    const user = await User.findOne({
        email
    });
    if (user) {
        return {
            isError: true,
            error: "email already taken!"
        }
    }
    return {
        isError: false
    }
}


// class Validate
// {
//     static instance

//     varifyUsername(username){
//         if(username === "")
//         {
//             return {
//                 isError: true,
//                 error: "Must not empty username!"
//             }
//         }
//         const user = await User.findOne({username : username});
//         if(user)
//         {
//             return {
//                 isError : true,
//                 error: "user already Register"
//             }
//         }
//         return {
//             isError : false
//         }
//     }

//     getInstance(){
//         if(!Validate.instance)
//         {
//             Validate.instance = new Validate();
//             return Validate.instance;
//         }
//         else{
//             return Validate.instance;
//         }
//     }
// }

// module.exports = {Validate}