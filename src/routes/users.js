import passport from "passport";
import { Router } from "express";
import { signUp, logIn, getHome } from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/user.js'



const routerUser = Router()

const passportOptions = { badRequestMessage : 'Datos erroneso o incompletos'}


routerUser.post('/signup' , signUp)
routerUser.post('/login' , logIn)

export default routerUser