import { Router } from "express";
import { login } from "../controllers/auth.conteollers";

const router = Router();

// Routes to auth
router.post("/", login);

// Export router
export default router;