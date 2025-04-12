import { Router } from 'express'
import { getItems, searchItems, deleteItems} from '../controllers/itemController'

const router = Router()

// Rota de teste
router.get('/', (req, res) => {
   res.send('API de Achados e Perdidos funcionando!')
})

// rota para listar todos os itens
router.get('/', getItems)

// Buscar itens com filtros
router.get('/buscar', searchItems)

// Remover itens pelo ID
router.delete('/id', deleteItems)
 

export default router
