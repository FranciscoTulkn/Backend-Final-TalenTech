import { Router } from "express";
import { login } from "../controllers/auth.conteollers";

const router = Router();

router.post("/", login);

export default router;