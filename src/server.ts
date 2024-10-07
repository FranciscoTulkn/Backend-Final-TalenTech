import express, { Application, Request, Response } from "express";
import cors from "cors";


import userRoutes from './routes/users.routes';

// Creando una clase para exportarla en el servidor
export class Server {
  private app: Application;
  private port: string;
  private api_paths = {
    home: "/api/v1/home",
    users: "/api/v1/users",
  }

  // Constructor para inicializar el servidor y la API
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middleware();  // Son los metodos inicializadas que seran llamados desde el midddleware

    this.routes();  // Son las rutas inicializadas que seran utilizadas en el servidor
  }

  // Funcion para validar que lleguen las peticiones al servidor
  mi_api() {
    this.app.get('/', (req: Request , res: Response ) => {
      res.status(200).json({ msg: "API funcionando"});
    });
  }

  // Funcion para usar un middleewares en el servidor
  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.mi_api();
  }

  // Rutas para el servidor
  routes(): void {
    this.app.use(this.api_paths.users, userRoutes)
  }

  // Funcion para validar el puerto en el servidor
  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto `, this.port);
    });
  }
};

