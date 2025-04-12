import { Router } from "express";
import multer from "multer";
import getItems from "../controllers/itemController";
import getItems, searchItems } from "../controllers/itemController";
import createItem } from "../controllers/itemController.js";

const router = Router();

// Rota de teste
router.get("/", (_req, res) => {
  res.send("API de Achados e Perdidos funcionando!");
});

// rota para listar todos os itens
router.get("/", getItems);

// Buscar itens com filtros
router.get("/buscar", searchItems);

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/item", upload.single("photo"), createItem);

export default router;
