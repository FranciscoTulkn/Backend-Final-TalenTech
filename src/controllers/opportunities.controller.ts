import { Request, Response } from "express";
import { OpportunitiesModel } from "../models/opportunities.model";

// End-Point tp get all opportunities
export const getOpportunities = async (req: Request, res: Response) => {

  try {
    const getAllOpportunities = await OpportunitiesModel.find({});

    res.json({ ok: true, opportunities: getAllOpportunities });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar las oportunidades de negocio", error });
  }
};

// End-Point to get opportunity for Id
export const getOpportunityById = async (req: Request, res: Response) => {
  
  const { id } = req.params;

  try {
    const getOpportunityById = await OpportunitiesModel.findById(id);

    res.json({ ok: true, opportunity: getOpportunityById });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al consultar la oportunidad de negocio por Id", error });
  }
};

// End-Point to update opportunity by Id
export const updateOpportunityById = async (req: Request, res: Response) => {

  const { id } = req.params;
  const payload = req.body;

  try {
    const updateOpportunityById = await OpportunitiesModel.findByIdAndUpdate(id, payload, { new: true });

    // Condicional
    if (updateOpportunityById) {
      res.json({ ok: true, opportunity: updateOpportunityById });
    } else {
      res.status(500).json({ ok: false, message: "Error al actualizar la oportunidad de negocio" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to delete opportunity by Id
export const deleteOpportunityById = async (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const deleteOpportunity = await OpportunitiesModel.findByIdAndDelete(id);

    // Condicional
    if (deleteOpportunity) {
      res.json({ ok: true, msg: "Oportunidad de negocio eliminada" });
    } else {
      res.status(500).json({ ok: false, message: "Error al eliminar la oportunidad de negocio" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Occurio un error", error });
  }
};

// End-Point to create opportunity
export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newOpportunity = new OpportunitiesModel({
      ...body
    });

    const saveOpportunity = await newOpportunity.save();

    res.status(201).json({ ok: true, opportunity: saveOpportunity, msg: "Oportunidad de negocio creada" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Error al crear la oportunidad de negocio", error });
  }
};