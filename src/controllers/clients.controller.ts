import { Request, Response } from "express";
import { ClientModel } from "../models/client.model";

// End-Point tp get all clients
export const getClients = async (req: Request, res: Response) => {
  
  try {
    const getAllClients = await ClientModel.find({}).populate("role.$Client");

    res.json({ ok: true, clients: getAllClients });
  } catch (error) {
    
    res.status(500).json({ ok: false, message: "Error al consultar los clientes", error });
  }
};

// End-Point to get client for NIT
export const getClientByNIT = async (req: Request, res: Response) => {

  const nit = req.params.nit;

  try {
    const getClientByNIT = await ClientModel.findOne({ nit });

    res.json({ ok: true, client: getClientByNIT, msg: "Este es el cliente consultado" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar el cliente por NIT", error });
  }
};

// End-Point to get client for Id
export const getClientById = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const getClientById = await ClientModel.findById(id);

    res.json({ ok: true, client: getClientById });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar el cliente por Id", error });
  }
};

// End-Point to update client by Id
export const updateClientById = async (req: Request, res: Response) => {

  const { id } = req.params;
  const payload = req.body;

  try {
    const updateClientById = await ClientModel.findByIdAndUpdate(id, payload, { new: true });

    // Condicional
    if (updateClientById) {
      res.json({ ok: true, client: updateClientById });
    } else {
      res.status(500).json({ ok: false, message: "Error al actualizar el cliente" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to delete client by Id
export const deleteClientById = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const deleteClient = await ClientModel.findByIdAndDelete(id);

    // Condicional
    if (deleteClient) {
      res.json({ ok: true, msg: "Cliente eliminado" });
    } else {
      res.status(500).json({ ok: false, message: "Error al eliminar el cliente" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to create client
export const createClient = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newClient = new ClientModel({
      ...body
    });

    const saveClient = await newClient.save();

    res.status(201).json({ ok: true, client: saveClient, msg: "Cliente creado" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al crear el cliente", error });
  }
};