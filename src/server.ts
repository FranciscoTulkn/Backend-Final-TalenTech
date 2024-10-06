import express, { Application, Request, Response } from "express";
import cors from "cors";

// Creando una clase para exportarla en el servidor
export class Server {
  private app: Application;
  private port: string;
  private api_paths = {
    home: "/api/v1/home"
  }

  // Constructor para inicializar el servidor y la API
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.middleware();  // Son los metodos iniciales que seran llamdos desde el midddleware
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

  // Funcion para validar el puerto en el servidor
  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto `, this.port);
    });
  }
};

