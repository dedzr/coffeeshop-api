const express=require('express');
const apiRouter = require('./api');
const helmet  = require('helmet');
const morgan = require('morgan');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const mongoose=require('mongoose');
const { mongoConnect } = require('../services/mongo');
const passport=require('passport');
require('./middlewares/auth.strats');



const app=express();

app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

async function connectDB()
{
    await mongoConnect();
}
connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET || "somesecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*2,
    },
    store:MongoStore.create(
        {
            client:mongoose.connection.getClient(),

       
    }),


}));



app.use(passport.initialize());
app.use(passport.session());



app.use('/api/v1',apiRouter);



module.exports=app;