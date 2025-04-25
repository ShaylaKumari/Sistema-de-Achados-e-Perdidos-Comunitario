import { Router } from "express";
import multer from "multer";
import {
  createItem,
  getItems,
  searchItems,
  updateItems,
  deleteItems
} from "../controllers/itemController.js";

const router = Router();

// Rota de teste
router.get("/teste", (_req, res) => {
  res.send("API de Achados e Perdidos funcionando!");
});

router.get("/", getItems); // Listar todos os itens
router.get("/buscar", searchItems);  // Buscar itens com filtros
router.delete("/:code", deleteItems); // Remover itens pelo ID
router.put("/:code", updateItems) // Atualizar itens 

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), createItem);

export default router;
