const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const cors = require("cors");

const {context} = require("./context/context");
const {Query} = require("./graphql/resolvers/Query")
const {Mutation} = require("./graphql/resolvers/Mutation")
const {Expense} = require("./graphql/resolvers/Expense")
const config = require("./config");


// mongodb connection 
const url = config.mongod;
const connect = mongoose.connect(url , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
  });

connect.then((db)=>{
    console.log("Successfully connect to the mongodb.");
})

// end of mongodb connection


const resolvers = {
    Query,
    Mutation,
    Expense
}
const server = new GraphQLServer({
     typeDefs : "./src/graphql/schema/schema.graphql" , 
     resolvers,
     context
    });

server.express.use(cors());

server.start(()=>{
    console.log("server running at localhost:4000")
})