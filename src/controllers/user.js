import passport from "passport";
import {UserModel} from "../models/user.js"
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


export const asignarCarrito = async(req, res) => {

    try {
        const { username , id_carrito } = req.body
        const user = await UserModel.findOne({ username : username})
        if (user) {
            
            const upd = await UserModel.findByIdAndUpdate(user._id,
                {
                    $addToSet: 
                    {
                        carritos: {
                            carrito: id_carrito,
                            estado: "Activo"
                        }
                    }
                }, { new : true})
            if (upd) {
                
                return res.status(200).json({
                    ok: true,
                    msg: "Carrito asignado correctamente",
                    user: upd
        
                })

            } else {
               return res.status(401).json({ok: false, msg: "Error al actualizar"}) 
            }

        } else {

            return res.status(404).json({ok: false, msg: "Erro al buscar el usuario"})

        }
    } catch (error) {
        console.log(error)
    }
}


export const finalizarCompra = async(req, res) => {

    try {
        const { username , id_carrito } = req.body
        const user = await UserModel.findOne({ username : username})
        if (user) {
            

            if (upd) {
                
                return res.status(200).json({
                    ok: true,
                    msg: "Error al finalizar compra",
                    user: upd
        
                })

            } else {
               return res.status(401).json({ok: false, msg: "Error, al finalizar compra"}) 
            }

        } else {

            return res.status(404).json({ok: false, msg: "Erro al buscar el usuario"})

        }
    } catch (error) {
        console.log(error)
    }
}
