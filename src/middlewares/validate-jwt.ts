import { NextFunction, Request, Response } from "express";

// Importar el middleware de validación JWT
const jwt = require("jsonwebtoken")

// Interface para el UserID
export interface CustomRequest extends Request {
  uid?: number;
}

// Función para implementar la validación o expiración del TOKEN
export const validateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Implementar validación JWT aquí
  const token = req.header("back-token");

  // Validar el token y continuar con la petición o responder con un mensaje de error
  if (!token) {
    return res.status(401).json({ 
      ok: false,
      message: "No token provided." 
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false, 
      message: "Invalid token"
    });
  }
};