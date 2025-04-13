import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers); // Listar todos os usuários
router.get("/:id", getUserById); // Buscar um usuário por ID
router.post("/", createUser); // Criar um novo usuário
router.put("/:id", updateUser); // Atualizar um usuário
router.delete("/:id", deleteUser); // Remover um usuário

export default router;