import multer from "multer";
import { createItem } from "../controllers/itemController.js";
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

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/item", upload.single("photo"), createItem);


