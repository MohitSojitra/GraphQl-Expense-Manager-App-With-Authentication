const User = require("../../models/userModel");
const Expense = {
    async user(parent , args , ctx , info){
        const user = await User.findById(parent.user);
        return user;
    }
}

module.exports = {Expense}