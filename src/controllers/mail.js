import nodemailer from "nodemailer"
import dotenv from "dotenv"




export const sendMailLogin = async ( user) => {
    console.log(user)
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
    
              user: 'oterojulioignacio@gmail.com',
              pass: process.env.MAIL_TOKEN
    
            }
          });
        const mailOptions = {
            from: 'Info - Usuarios ',
            to: user.email,
            subject: "Nuevo usuario registrado 💙",
            html : `<h1>${user.nombre} ${user.apellido} acaba de unirse a la familia!!! </h1>`,
    
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return false
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return true
    } catch (error) {
        console.log(error)
        return false
    }

    




}