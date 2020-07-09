const User = require("../../models/userModel");
const Expense = require("../../models/expenseModel");
const bcrypt = require("bcrypt");
const validate = require("../../validation/validate");

const Mutation = {

    // signup for user
    async register(parent , args , ctx , info) {
        const {username , password , email , name} = args.data;
        
        try{
            const validUsername = await validate.varifyUsername(username);
            if(validUsername.isError)
            {
                throw new Error(validEmail.error);
            }

            const validEmail = await validate.verifyEmail(email);
            if(validEmail.isError)
            {
                throw new Error(validEmail.error);
            }

            const passwordHash = await bcrypt.hash(password , 12);
            const user = new User({
                name,
                email,
                password : passwordHash,
                username
            })

            const createdUser = await user.save()
            
            // console.log(createdUser)
            const token = ctx.getToken(createdUser._id);

            const res =  {
                _id: createdUser._id,
                username : createdUser.username,
                name: createdUser.name,
                email: createdUser.email,
                token
            }
            // console.log(res);

            return {
               ...res
            }
        }
        catch(e){
            // console.log(e)
            throw new Error(e);
        }
    },

    // login for user

    async login(parent , args , ctx , info){
        // console.log(isAuth())
        // isAuth();
        // console.log(ctx);
        const {username , password}  = args.data;

        const user = await User.findOne({username : username});
        if(!user)
        {
            throw new Error("user not found");
        }
        // console.log(user);
        const match = await bcrypt.compare(password , user.password);
        if(!match)
        {
            throw new Error("Password is incorrect");
        }

        const token = await ctx.getToken(user._id);
        return {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token
        }

        // passport.authenticate("local")
    },

    async addExpense(parent, args , ctx , info)
    {
        // const {title , amount , isPaid , date} = args.data;
        try{
        const {userId} = await ctx.getUserId();
        // console.log(userId)
        const expense = await new Expense({
            ...args.data,
            user: userId
        })

        const createdExpense = await expense.save();
        // console.log(createdExpense);
        return {
            title : createdExpense.title,
            isPaid: createdExpense.isPaid,
            amount: createdExpense.amount,
            date: createdExpense.date,
            user: createdExpense.user
        }

        }
        catch(err){
            throw new Error(err);
        }

    },

    async updateExpense(parent , args , ctx , info)
    {
        try{
            const {id} = args;
            // console.log(id);
            const {title , amount , isPaid , date} = args.data;

            const {userId} = await ctx.getUserId(); // here userId is not required, but this is for , checking authentication header valid or not.

            // checking id is available And also check this expese is belong to that user
            try{
                const findedExpense = await Expense.findById(id);
                if(findedExpense.user != userId)
                {
                    throw new Error ("You are not authorize to this Expense");
                }
            }
            catch(err)
            {
                throw new Error("Expense not found or id is invalid!")
            }

            const updateObject = {};

            if(typeof title === "string")
            {
                updateObject.title = title
            }
            if(typeof amount === "number")
            {
                updateObject.amount = amount
            }
            if(typeof isPaid === "boolean")
            {
                updateObject.isPaid = isPaid
            }
            if(typeof date === "string")
            {
                updateObject.date = date
            }

            const expense = await Expense.findByIdAndUpdate(id , {$set : updateObject} , {new : true});

            return expense;



        }
        catch(err){
            throw new Error(err);
        }
    },
    async deleteExpense(parent , args , ctx , info){
        try{
            // console.log("first line.")
            const {id} = args;
            const {userId} = await ctx.getUserId(); // it is for checking auth header

            // checking id is available And also check this expese is belong to that user
            try{
                const findedExpense = await Expense.findById(id);
                if(findedExpense.user != userId)
                {
                    console.log("ha error")
                    throw new Error ("You are not authorize to this Expense");
                }
            }
            catch(err)
            {
                
                throw new Error(err)
            }

            
            const expense = await Expense.findByIdAndRemove(id);
            return expense;
        }
        catch(err){
            throw new Error(err);
        }
    },
    async updateProfile(parent , args , ctx , info){
        try{
            // const {id} = args;
            const {name , email} = args.data;
            const {userId} = await ctx.getUserId(); // for checking auth header
            console.log(userId)

            const userObject = {};

            if(typeof name === "string")
            {
                userObject.name = name
            }
            if(typeof email === "string")
            {
                userObject.email = email
            }
            console.log(userObject);

            const updatedUser = await User.findByIdAndUpdate(userId , {$set : userObject} , {new : true});

            return updatedUser;

        }
        catch(err)
        {
            throw new Error(err)
        }
    }
}
module.exports = {Mutation}