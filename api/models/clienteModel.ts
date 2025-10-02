import { getCentralPool } from "../db/clientePoolManager"
import type mysql from "mysql2/promise"

export type Product = {
    id: number
    name: string
}

//Buscar Id 
export default class ClienteModel{
    static async findProductById(pool: mysql.Pool, id: number): Promise<Product | null>{
        const[rows] = await pool.query<mysql.RowDataPacket[]>(
            'SELECT * FROM produto WHERE id = ?',
            [id]
        );
        return (rows as any[])[0] ?? null;
    }
    // static async findRandomProduct(pool: mysql.Pool): Promise<Product | null> {
    //     const [rows] = await pool.query(
    //         'SELECT * FROM produto ORDER BY RAND() LIMIT 1'
    //     );
    //     return (rows as any[])[0] ?? null;
    // }
}

