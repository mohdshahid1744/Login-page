const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const session = require("express-session")



const securepassword = async(password)=>{
    try{
      const passwordHash =   await bcrypt.hash(password,10)
      return passwordHash;
    }catch(error){
        console.log(error.message)
    }
}


const loadRegister = async(req,res)=>{
    try{
        res.render('user/signup')

    } catch(error){
        console.log(error.message);
    }
}
//user registration 
const insertUser = async(req,res)=>{
    const { name, email, password, mno } = req.body;
    try{
        const spassword = await securepassword(password)
        const user = new User({
            name,
            email,
            password: spassword,
            mobile: mno,
        })
        
        const userData = await User.findOne({name:name})
        if(userData){  
          
            res.render('user/login',{message:"User already exist."})
        }
        else if(!userData){
            user.save()
            res.render('user/signup',{message:"your registration has been successfully"})
            
             req.session.user = user._id;

        }else{
            res.render('user/signup',{message:'your registration has been failed.'})
        }
    } catch(error){
        console.log(error.message);
    }

}


const loadlogin = async(req,res)=>{
    try{
        res.render('user/login')

    } catch(error){
        console.log(error.message);
    }
}


const userValid = async(req,res)=>{
    const {name,password} = req.body;
 
    try{
        
        const user = await User.findOne({name})
        if(!user){  
          
            return res.render('user/login',{message:"user not found"})
        }
      
        const isMatch = await bcrypt.compare(password, user.password)
        
     
        if(!isMatch){
            return res.render('user/login',{message:'wrong password'})
        }
   
        req.session.user = user._id;
        res.redirect('/home')

       

    } catch(error){
        console.log("uservalid")
        console.log(error.message);
    }
}

const loadHome = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        res.render('user/home', { user, error: null })
    } catch (error) {
        res.render('user/home', { error: 'Somthing went wrong', user: null })
    }
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}



module.exports = {
    loadRegister,
    insertUser,
    loadlogin,
    userValid,
    loadHome,
    logout
}
