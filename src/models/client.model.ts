import { model, PopulatedDoc, Schema } from "mongoose";


export interface IClient extends Document {
  nit: string;
  name: string;
  mail: string;
  phone: string;
  address: string;
  role: PopulatedDoc<any>[];
}

// Create a schema
const ClientSchema: Schema = new Schema({
  nit: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  mail: {
    type: String
  },

  phone: {
    type: String
  },

  address: {
    type: String
  },

  roel: {
    type: String,
    required: true,
    default: "Client"
  }
})

// Export the model
export const ClientModel = model<IClient>("Client", ClientSchema);