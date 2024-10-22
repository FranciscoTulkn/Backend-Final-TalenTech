import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";



export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    // Verify to email
    const userDb = await UserModel.findOne({ email });

    if (!userDb) {
      return res.status(400).json({ ok: false, message: "El email no fue encontrado" });
    }

    // Verify to password
    if (userDb.password) {
      const validPassword = bcrypt.compareSync(password, userDb.password);

      if (!validPassword) {
        return res.status(400).json({ ok: false, message: "La contraseña es incorrecta" });
      }
    }
  
    // Generate JWT token
    const token = await generateJWT(userDb.id, userDb.email);

    res.status(200).json({ ok: true, user: userDb, token });
    
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al iniciar sesión" });
  }
}

// Renew JWT token
export const renewToken = async (req: CustomRequest, res: Response) => {

  const uid = req.uid;
  console.log(uid);
  if (!uid) {
    throw new Error("uid not provided");
  };

  const user = await UserModel.findById(uid);

  // Generate new JWT token
  const token = await generateJWT(uid.toString());

  res.json({ ok: true, user, token });
};