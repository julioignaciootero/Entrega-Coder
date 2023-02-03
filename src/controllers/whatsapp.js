import dotenv from 'dotenv';
import { twilioClient } from "../services/wspservices.js";
dotenv.config();


export const sendWS = async(user, carrito)  => {
    try {
      const message = {
        body: "carrito comprado",
        from: process.env.CEL,
        to: 'whatsapp+5491121714727',
      };
      const response = await twilioClient.messages.create(message);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
}