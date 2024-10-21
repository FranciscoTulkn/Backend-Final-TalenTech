import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl: string | undefined = process.env.CONNECTION;

    if (!dbUrl) {
      throw new Error("No hay conexión a la base de datos");
    }

    await mongoose.connect(dbUrl);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error(error);
  }
}