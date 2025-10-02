// app.ts
import express from 'express';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';
// import { validateHeader } from './middleware/validateTarefaBody.js';


const app = express();
const PORT = process.env.PORT || 3000;


//Middlewares globais
app.use(express.json());
app.use(requestLogger)

// app.use(validateHeader)
app.use('/api', routes);

//Error handler
app.use(errorHandler);


// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});