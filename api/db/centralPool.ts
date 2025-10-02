import 'dotenv/config'
import mysql from 'mysql2/promise'


export type CredClient ={
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
};

// * Classe Singleton 
class CentralPool {
    private static instance: CentralPool;

    private constructor() {}

    static getInstance(): CentralPool{
        if(!this.instance){
            this.instance = new CentralPool();
        }
    return this.instance
    }
    
    getOrCreate (creds: CredClient){
        const pool = mysql.createPool({
            host: creds.host,
            port: creds.port,
            user: creds.user,
            password: creds.password,
            database: creds.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        })
        return pool;
    }
}
export default CentralPool;
