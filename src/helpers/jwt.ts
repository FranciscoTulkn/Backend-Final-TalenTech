import dotenv from 'dotenv';

// Importamos el paquete jsonwebtoken
const jwt = require("jsonwebtoken");

dotenv.config();

// Función para generar un JWT
export const generateJWT = (
  uid: string, 
  auth: string, 
  expiresIn: string = process.env.EXPIRES_IN || "7h", 
  jwtSecret: string | undefined = process.env.JWT_SECRET
) => {

  return new Promise( (resolve, reject) => {
    const payload =  {
      uid, 
      auth,
    };

    jwt.sing(
      payload, 
      jwtSecret,
      {
        expiresIn: expiresIn
      },
      (error: string, token: string) => {
        if(error){
          console.error(error);
          reject("No se puede generar el TOKEN");
        } else {
          resolve(token);
        }
      }
    )
  });
}