import dotenv from 'dotenv';
import { twilioClient } from "../services/wspservices.js";
import { logger } from "../config/logs.js";
dotenv.config();


export const sendWS = async(user, carrito)  => {
    try {
      const message = {
        body: `Orden de compra: ${carrito._id}`,
        from: process.env.CEL,
        to: 'whatsapp:+5491121714727',
      };
      const response = await twilioClient.messages.create(message);
      logger.info("Wsp enviado")
    //   res.json(response);
    } catch (error) {
      console.log(error);
    }
}