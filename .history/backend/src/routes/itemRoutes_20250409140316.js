import { Router } from "express";
import multer from "multer";
import { createItem } from "../controllers/itemController.js";

const router = Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/item", upload.single("photo"), createItem);

export default router;
