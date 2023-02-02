import passport from "passport";
import {sendMailLogin} from "../controllers/mail.js"

const passportOptions = { badRequestMessage : 'Datos erroneso o incompletos'}

export const signUp = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if(err) {
            return next(err)
        }
        if(!user) return res.status(401).json(info);

        const envio = sendMailLogin(user)

        res.json({msg: 'signup OK'})
    })(req, res, next);
}

export const logIn = (req, res) => {
    res.status(200).json({msg: `Holis! ${req.username}`})
}

export const getHome = (req, res) => {
    res.status(200).json({session: req.session})
}