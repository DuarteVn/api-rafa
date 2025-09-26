// app.ts
import express from 'express';
import tarefaRoutes from './routes/tarefaRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurando as rotas da aplicação para utilizar as rotas relacionadas às tarefas
app.use(express.json());
app.use('/api', tarefaRoutes);

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});