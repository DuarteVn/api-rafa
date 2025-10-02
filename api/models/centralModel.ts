import { getCentralPool } from "../db/clientePoolManager.js";
import type mysql2 from 'mysql2';

export type CredClientRow ={
    id:number;
    token: string;
    db_host: string;
    db_port: number;
    db_user: string;
    db_password: string;
    db_name: string;
    enabled: 0 | 1 | boolean;
};

//Buscar credencial na central
export default class CentralModel{
    static async findByToken(token: string): Promise<CredClientRow | null>{
        const pool = getCentralPool();
        const[rows] = await pool.query<mysql2.RowDataPacket[]>( //todo/ indica que o rows é uma array de objetos "linha", o await para até que a query concluir e retornar 
           'SELECT * FROM cliente WHERE token = ?',
            // "SELECT * FROM produto WHERE id = ?",
           [token] 
        );
        const row = (rows as any[])[0]; // Primeira linha do resultado
        return row ?? null;
    }
}