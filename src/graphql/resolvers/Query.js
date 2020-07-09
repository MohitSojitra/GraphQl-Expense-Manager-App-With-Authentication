const Expense = require("../../models/expenseModel");
const User = require("../../models/userModel");
const Query = {
    async checkValidUser(parent , args , ctx , info){
        try {
            const {userId } = await ctx.getUserId();
            if(userId)
            {
                return true;
            }
            return false
        }
        catch(err)
        {
            throw new Error(err);
        }
    },
    async getMonthExpense(parent , {date} , ctx , info){
        try{
            const {userId} = ctx.getUserId();
            const reqMonth = date.split("-")[1];
            const expenses = await Expense.find({user : userId});
            const responseExpense = await expenses.reduce((accumulator , expense)=>{
                if(expense.date.split("-")[1] === reqMonth && expense.isPaid)
                {
                    return accumulator + expense.amount
                }
                return accumulator + 0
            },0)

            return responseExpense;

        }
        catch(err)
        {
            throw new Error(err);
        }
        
    },

    async getMonthIncome(parent , {date} , ctx , info){
        try{
            // console.log("get month run?")
            const {userId} = ctx.getUserId();
            const reqMonth = date.split("-")[1];
            const expenses = await Expense.find({user : userId});
            const responseIncome = await expenses.reduce((accumulator , expense)=>{
                if(expense.date.split("-")[1] === reqMonth && !expense.isPaid)
                {
                    return accumulator + expense.amount
                }
                return accumulator + 0
            },0)

            return responseIncome;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },
    async getMonthExpenseData(parent , {date} , ctx , info)
    {
        try {
            // console.log("it run")
            const {userId} = await ctx.getUserId();
            const reqMonth = date.split("-")[1];

            const expenses = await Expense.find({user : userId});

            const responseExpenses = await expenses.filter((expense)=>{
                const month = expense.date.split("-")[1];
                if(reqMonth === month)
                {
                    return true
                }
                return false
            });

            return responseExpenses;


        }
        catch(err)
        {
            throw new Error(err);
        }
    },
    async me(parent , args , ctx , info){
        try{
            const {userId} = await ctx.getUserId(); // for authenticateing user

            const fetchedUser = await User.findById(userId)

            return fetchedUser;

        }
        catch(err)
        {
            throw new Error(err);
        }
    },
    async getExpenseById(parent , args , ctx , info){
        try{
            const {id} = args;
            const {userId} = await ctx.getUserId();
           
            const findedExpense = await Expense.findById(id);
            if(findedExpense.user != userId)
            {
                throw new Error("this post not belong to you!")
            }

            return findedExpense;


        }
        catch(err){
            throw new Error(err);
        }
    }
}


module.exports = {Query}