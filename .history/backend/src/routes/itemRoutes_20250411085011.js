<<<<<<< HEAD
import { Router } from 'express'
import { getItems, searchItems } from '../controllers/itemController'

const router = Router()

// Rota de teste
router.get('/', (_req, res) => {
   res.send('API de Achados e Perdidos funcionando!')
})

// rota para listar todos os itens
router.get('/', getItems)

// Buscar itens com filtros
router.get('/buscar', searchItems)


export default router
=======
>>>>>>> 81490cc (feat: add endpoint for item creation with validation and controller logic)
