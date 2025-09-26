import { Request, Response, NextFunction } from "express"

export default function errorHandler(err: unknown, _req: Request, res:Response, _next: NextFunction){
    console.error("Erro", err)
    res.status(500).json({error:"Erro interno do servidor"})
}