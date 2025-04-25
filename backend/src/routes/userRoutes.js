import express from "express";
import {
  findAllUsers,  
  createUser,
  updateUser,
  deleteUser,
  findUserAndItems,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", findAllUsers); // Buscar todos os usuários
router.post("/", createUser); // Criar um novo usuário
router.put("/:id", updateUser); // Atualizar um usuário
router.delete("/:id", deleteUser); // Remover um usuário
router.get("/:id/items", findUserAndItems); // Buscar itens de um usuário específico

export default router;