import mysql from 'mysql2/promise'

//Variável de módulo que guarda uma instância de pool
let centralPool: mysql.Pool | null = null // Declara uma variável de instância única // Lazy

export function getCentralPool(): mysql.Pool{
    if(!centralPool){ //Garante que só crie 1x
       centralPool = mysql.createPool({
            host: process.env.CENTRAL_DB_HOST,
            port: Number(process.env.CENTRAL_DB_PORT),
            user: process.env.CENTRAL_DB_USER,
            password:process.env.CENTRAL_DB_PASSWORD,
            database: process.env.CENTRAL_DB_NAME,
            waitForConnections: true, //quando o pool atingir o limite, espera uma conexão ficar livre ao inves de falhar
            connectionLimit: 10, 
            queueLimit: 0 // 0 = Ilimitado, a fila de espera por conexões pode crescer sem limite (req)
        });
    }
    return centralPool;
} 