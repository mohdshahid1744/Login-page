
const userRoute = require('./route/userRoute')
const adminRoute = require('./route/adminRoute')
const session = require('express-session')
const path=require('path')
const mongoose = require("mongoose")
const nocache = require('nocache')
const express = require('express')
const app = express();

app.use('/static',express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')
app.use(nocache())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret:"asdfghjkloiuyyjdsh",
    resave:false,
    saveUninitialized:true
}))

app.use('/',userRoute)
app.use('/admin',adminRoute)

mongoose
    .connect('mongodb://127.0.0.1:27017/signup-page')
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))


app.listen(3000,function(){
    console.log("server runnng");
})