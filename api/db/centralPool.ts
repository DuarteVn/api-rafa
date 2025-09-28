import 'dotenv/config'
import mysql from 'mysql2/promise'


export type CredClient ={
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
};

// Classe Singleton 
class CentralPool {
    private static instance: CentralPool;

    private constructor() {}

    static getInstance(): CentralPool{
        if(this.instance == null){
            this.instance = new CentralPool();
        }
    return this.instance
    }
 

}
export default CentralPool;