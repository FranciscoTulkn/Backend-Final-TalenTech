import { model, PopulatedDoc, Schema } from "mongoose";

// Create to Interface of User
export interface IUser extends Document {
  documentNumber: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dateBirth: Date; //Formato 2024-10-03T00:00:00.000Z
  role: PopulatedDoc<any>[];
}

// Create a schema
const UserSchema: Schema = new Schema({
  documentNumber: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  address: {
    type: String
  },

  dateBirth: {
    type: Date
  },

  role: {
    type: String,
    require: true, 
    default: "USER_ROLE",
  },

});

// Export the model
export const UserModel = model<IUser>("User", UserSchema);
