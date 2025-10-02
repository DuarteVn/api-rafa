// routes/tarefaRoutes.ts
import {Router} from 'express';
import TarefaController from '../controllers/tarefaController.js';
import validateTarefaBody, { validateHeader } from '../middleware/validateTarefaBody.js';
import authToken from '../middleware/authToken.js';
import ProbeController from '../controllers/ProbeController.js';


const router = Router();
// Rotas para operações CRUD de tarefas
router.get('/tarefas', TarefaController.listarTarefas);
router.post('/tarefas', validateHeader,validateTarefaBody,TarefaController.criarTarefas);


router.get('/probe/product/:id', authToken, ProbeController.probe);


export default router;