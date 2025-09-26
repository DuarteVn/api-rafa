import { Request, Response, NextFunction } from "express"


export default function requestLogger(req: Request, res:Response, next: NextFunction) {
  console.log('Request Type:', req.method)
  next()
}