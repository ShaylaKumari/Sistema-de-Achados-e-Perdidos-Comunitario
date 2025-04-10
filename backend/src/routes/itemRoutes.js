  import { Router } from 'express';

  const router = Router();

  // Rota de teste
  router.get('/', (req, res) => {
    res.send('API de Achados e Perdidos funcionando!');
  });

  export default router;
