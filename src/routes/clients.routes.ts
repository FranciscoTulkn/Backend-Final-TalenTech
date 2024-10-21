import { Router } from "express";
import { getClients, getClientByNIT, getClientById, updateClientById, deleteClientById, createClient } from "../controllers/clients.controller";

const router = Router();

// Routes to clients
router.get('/', getClients);
router.get('/nit/:nit', getClientByNIT)
router.get('/id/:id', getClientById)
router.post("/", createClient);
router.put('/update/:id',updateClientById)
router.delete('/delete/:id',deleteClientById)

export default router;