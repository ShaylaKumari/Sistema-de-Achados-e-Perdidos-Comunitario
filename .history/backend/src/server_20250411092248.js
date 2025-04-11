import express from 'express';
import 'dotenv/config';
import routes from './routes/itemRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
