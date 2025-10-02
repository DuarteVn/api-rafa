// db/clientePoolManager.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

let centralPool: mysql.Pool | null = null;

export function getCentralPool(): mysql.Pool {
  if (!centralPool) {
    // Debug opcional
    console.log('[ENV CHECK] host=', process.env.CENTRAL_DB_HOST, 'user=', process.env.CENTRAL_DB_USER);

    if (!process.env.CENTRAL_DB_HOST || !process.env.CENTRAL_DB_USER || !process.env.CENTRAL_DB_NAME) {
      throw new Error('Variáveis do banco CENTRAL ausentes. Verifique .env e o caminho no dotenv.config().');
    }

    centralPool = mysql.createPool({
      host: process.env.CENTRAL_DB_HOST,
      port: Number(process.env.CENTRAL_DB_PORT || 3306),
      user: process.env.CENTRAL_DB_USER,
      password: process.env.CENTRAL_DB_PASSWORD ?? '',
      database: process.env.CENTRAL_DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return centralPool;
}



//  NOME SUJEITO A ALTERAÇÕES, ELE ESTÁ SENDO USADO 
// //COMO UM SINGLETON DE CONEXÃO PARA A BASE CENTRAL.
// ! 
// *
// TODO
// ?