import { Request, Response, NextFunction } from "express";

export default function authToken(req: Request, res: Response, next:NextFunction){
    const auth = req.get("authorization");                           // Verifica se o header Authorization está presente
    if (!auth?.startsWith('Bearer ')){                              // Portador do Token abc123xyz567
        return res.status(401).json({error: "Token ausente."})      
    }
    const token = auth.slice(7);
    (req as any).token = token;
    next();
}