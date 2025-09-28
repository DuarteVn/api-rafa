import { getCentralPool } from "../db/clientePoolManager";

export type CredClient ={
    id:number,
    token: string,
    db_host: string
    db_port: number
    db_user: string
    db_password: string
    db_name: string
    enabled: boolean
};

//Buscar credencial na central
export default class CentralModel{
    

}