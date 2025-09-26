// controllers/tarefaController.ts
import { Request, Response, NextFunction } from 'express';
import TarefaModel from '../models/Tarefa.js';

export default class TarefaController{
  static listarTarefas(_req: Request, res:Response): void{
    const itens = TarefaModel.list();
    res.json(itens)
  }

  static criarTarefas( req: Request, res:Response, next: NextFunction){
    try {
      const { descricao } = req.body;
      const nova = TarefaModel.create(descricao)
      res.status(201).json(nova)
    } catch (e) {
      next(e);
    }
  }
}