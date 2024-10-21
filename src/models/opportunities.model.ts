import { model, Schema } from "mongoose";


export interface IOpportunities extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
    type: String,
    required: true
  },

  user_id: {
    type: String,
  }
});

// Export the model
export const OpportunitiesModel = model<IOpportunities>("Opportunities", OpportunitiesSchema);