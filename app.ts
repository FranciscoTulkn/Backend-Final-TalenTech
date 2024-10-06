import dotenv from 'dotenv';
import { Server } from './src/server';

// Configurando las variables de entorno
dotenv.config();

// Inicializando el Servidor
const server = new Server(); 
server.listen();