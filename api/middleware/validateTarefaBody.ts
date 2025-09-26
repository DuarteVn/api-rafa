import { Request, Response, NextFunction } from "express";


export default function validateTarefaBody(req: Request, res:Response, next: NextFunction){
    const { descricao} = req.body ?? {};
    // Garante que seja string ou se falhar não avalia o resto
    if (typeof descricao !== 'string' || !descricao.trim()){
        return res.status(400).json({error:"Campo obrigatório"})
    }
    next();
}

export function validateHeader(req: Request, res:Response, next: NextFunction){
    const header  = req.headers['xpto']

    if (header == "xpto"){
        next()
    } else {
        return res.status(400).json({error:"token invalido"})
    }
}
