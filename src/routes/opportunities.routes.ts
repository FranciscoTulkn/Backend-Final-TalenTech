import { Router } from "express";
import { getOpportunities, getOpportunityById, createOpportunity, updateOpportunityById, deleteOpportunityById } from "../controllers/opportunities.controller";

const router = Router();

// Routes to opportunities
router.get('/', getOpportunities);
router.get('/id/:id', getOpportunityById)
router.post("/", createOpportunity);
router.put('/update/:id',updateOpportunityById)
router.delete('/delete/:id',deleteOpportunityById)

export default router;