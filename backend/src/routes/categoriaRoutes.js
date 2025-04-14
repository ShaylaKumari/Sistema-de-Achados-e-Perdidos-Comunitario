import express from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", getCategorias); // Listar todas as categorias
router.get("/:id", getCategoriaById); // Buscar uma categoria por ID
router.post("/", createCategoria); // Criar uma nova categoria
router.put("/:id", updateCategoria); // Atualizar uma categoria
router.delete("/:id", deleteCategoria); // Remover uma categoria

export default router;