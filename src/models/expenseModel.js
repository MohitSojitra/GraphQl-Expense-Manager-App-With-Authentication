const mongoose = require("mongoose");
const schema = mongoose.Schema;


const expenseModel = new schema({
    title : {
        type: String,
        required: true
    },
    isPaid : {
        type: Boolean,
        required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{
    timestamps: true
});


module.exports = mongoose.model("expense" , expenseModel);