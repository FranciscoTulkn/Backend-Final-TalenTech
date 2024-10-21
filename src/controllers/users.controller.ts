import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bycrypt from "bcrypt";

// End-Point to get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await UserModel.find({}).populate("role");

    res.json({ ok: true, users: getAllUsers });
  } catch (error) {
    
    res.status(500).json({ ok: false, message: "Error al consultar los usuarios", error });
  }
};

// End-Point to get user for DocumentNumber
export const getUserByDocumentNumber = async (req: Request, res: Response) => {

  const documentNumber = req.params.documentNumber;

  try {
    const getUserByDocumentNumber = await UserModel.findOne({ documentNumber });

    res.json({ ok: true, user: getUserByDocumentNumber, msg: "Este es el usuario consultado" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar el usuario", error });
  }
};

// End-Point to get user for Id
export const getUserById = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const getUserById = await UserModel.findById(id);

    res.json({ ok: true, user: getUserById });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar el usuario", error });
  }
};

// End-Point to update user by Id
export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const updateUserById = await UserModel.findByIdAndUpdate(id, payload, { new: true });

    // Condicional
    if (updateUserById) {
      res.json({ ok: true, user: updateUserById });
    } else {
      res.status(500).json({ ok: false, message: "Error al actualizar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to delete user by Id
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);

    // Condicional
    if (deleteUser) {
      res.json({ ok: true, msg: "Usuario eliminado" });
    } else {
      res.status(500).json({ ok: false, message: "Error al eliminar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { password } = req.body;

    const newUser = new UserModel({
      ...body
    });

    // Condicional
    if (password){
      const salt = bycrypt.genSaltSync(10);
      newUser.password = bycrypt.hashSync(password, salt);
    }

    const saveUser = await newUser.save();

    res.status(201).json({ ok: true, user: saveUser, msg: "Usuario creado" });

  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al crear el usuario", error });
  }

}