import { model, Schema, Types } from "mongoose";


export interface IOpportunities extends Document {
  title: string;
  description: string;
  startDate: Date; //Formato 2024-10-03T00:00:00.000Z
  endDate: Date; //Formato 2024-10-03T00:00:00.000Z
  status: string;
  client_id: string;
  user_id: string;
};

// Create a schema
const OpportunitiesSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {  
    type: Date,
    required: true  
  },

  status: {
    type: String,
  },

  client_id: {
    type: Types.ObjectId,
    ref: "Client",
  },

  user_id: {
    type: Types.ObjectId,
    ref: "User",
  }
});

// Export the model
export const OpportunitiesModel = model<IOpportunities>("Opportunities", OpportunitiesSchema);