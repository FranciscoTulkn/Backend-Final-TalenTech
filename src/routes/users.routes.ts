import { Router } from "express";
import { createUser, deleteUserById, getUserByDocumentNumber, getUserById, getUsers, updateUserById } from "../controllers/users.controller";

const router = Router();

// Routes to users
router.get('/', getUsers);
router.get('/document/:document', getUserByDocumentNumber)
router.get('/id/:id', getUserById)
router.post("/", createUser);
router.put('/update/:id',updateUserById)
router.delete('/delete/:id',deleteUserById)

export default router;