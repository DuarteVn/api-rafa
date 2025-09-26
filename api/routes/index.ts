// routes/tarefaRoutes.ts
import {Router} from 'express';
import TarefaController from '../controllers/tarefaController.js';
import validateTarefaBody from '../middleware/validateTarefaBody.js';

const router = Router();
// Rotas para operações CRUD de tarefas
router.get('/tarefas', TarefaController.listarTarefas);
router.post('/tarefas', validateTarefaBody,TarefaController.criarTarefas);

export default router;