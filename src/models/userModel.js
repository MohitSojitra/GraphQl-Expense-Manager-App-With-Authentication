const mongoose = require("mongoose");
const schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

const userModel = new schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String
    }
},{
    timestamps: true
});

// userModel.plugin(passportLocalMongoose);
module.exports = mongoose.model("user" , userModel);