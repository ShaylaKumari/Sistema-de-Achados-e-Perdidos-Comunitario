import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const getUsers = async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { itens: true }, // Inclui os itens relacionados ao usuário
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar os usuários." });
  }
};

// Buscar um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      include: { itens: true }, // Inclui os itens relacionados ao usuário
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar o usuário." });
  }
};

// Criar um novo usuário
export const createUser = async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    const newUser = await prisma.usuario.create({
      data: {
        name,
        phone,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
};

// Atualizar um usuário
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        email,
      },
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
};

// Remover um usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ message: "Usuário removido com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover o usuário." });
  }
};