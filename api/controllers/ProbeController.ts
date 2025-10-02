import { Response, Request, NextFunction } from 'express';
import mysql from 'mysql2/promise';
import CentralModel from '../models/centralModel.js';
import ClienteModel from '../models/clienteModel.js';
import logger from '../utils/log.js';

export default class ProbeController {
  //* GET /api/probe/product/:id   (Authorization: Bearer <token>)
  static async probe(req: Request, res: Response, next: NextFunction) {
    let clientPool: mysql.Pool | null = null;

    try {
      const token = (req as any).token as string;
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

      // ! 1) CENTRAL → busca credenciais do cliente
      const row = await CentralModel.findByToken(token);
      if (!row) return res.status(403).json({ error: 'Token inválido' });

      const enabled = typeof row.enabled === 'boolean' ? row.enabled : !!row.enabled;
      if (!enabled) return res.status(403).json({ error: 'Cliente desativado' });
      
      logger.debug(" ")
      //! 2) CLIENTE → cria pool com as credenciais retornadas
      clientPool = mysql.createPool({
        host: row.db_host,
        port: row.db_port,
        user: row.db_user,
        password: row.db_password,
        database: row.db_name, 
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      
      //! 3) Query no banco do cliente
      const product = await ClienteModel.findProductById(clientPool, id);
      if (!product) 
        return res.status(404).json({ error: 'Produto não encontrado' });

      // 4) Resposta
      return res.json({
        client: { id: row.id, db: row.db_name },
        product,
      });
    } catch (err) {
        logger.error(" ")
      return next(err);
    } finally {
      // encerra o pool do cliente por request (sem cache)
      if (clientPool) {
        await clientPool.end().catch(() => {});
      }
    }
  }
}
