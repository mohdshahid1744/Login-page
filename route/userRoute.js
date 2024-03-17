const express = require('express')
const user_route = express.Router()
const Auth = require("../middleware/auth")
const userController = require('../controllers/userController')
const { isLogedout, isLogged } = require('../middleware/auth')
 
user_route.get('/signup', isLogedout, userController.loadRegister)

user_route.post('/signup', isLogedout, userController.insertUser)
 
user_route.get('/login', isLogedout, userController.loadlogin)

user_route.post('/login', isLogedout, userController.userValid)

user_route.get('/',Auth.checkinguseroradmin)

user_route.post('/logout',Auth.logouting)

user_route.get('/home',Auth.isLogged,userController.loadHome)


module.exports = user_route