import { Router } from "express";
import multer from "multer";

const router = Router();

// Rota de teste
router.get("/", (_req, res) => {
  res.send("API de Achados e Perdidos funcionando!");
});

// rota para listar todos os itens
router.get("/", itemController.getItems);

// Buscar itens com filtros
router.get("/buscar", itemController.searchItems);

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/item", upload.single("photo"), itemController.createItem);

export default router;
