import { PrismaClient } from "../generated/prisma/client.js";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

// listar todos os itens
export const getItems = async (req, res) => {
  try {
    const itens = await prisma.item.findMany({
      include: {
        category: true, // Inclui os dados da categoria relacionada
        user: true,     // Inclui os dados do usuário relacionado
      },
    });

    return res.status(200).json(itens);
  } catch (error) {
    console.error("Erro ao listar os itens:", error);
    return res.status(500).json({ error: "Erro ao listar os itens" });
  }
};

// Buscar itens com filtros
export const searchItems = async (req, res) => {
  const { category, location, status } = req.query;

  try {
    // Construir o filtro dinamicamente com base nos parâmetros recebidos
    const filtro = {};

    if (category) {
      filtro.categoria = {
        nome_categoria: category.toLowerCase(), // Normalizar o nome da categoria
      };
    }

    if (location) {
      filtro.location = {
        contains: location, // Busca parcial (case-insensitive)
        mode: "insensitive", // Ignorar maiúsculas/minúsculas
      };
    }

    if (status) {
      if (!["Achado", "Perdido"].includes(status)) {
        return res.status(400).json({
          error: 'O campo status deve ser "Achado" ou "Perdido".',
        });
      }
      filtro.status = status;
    }

    // Buscar itens com base no filtro
    const itens = await prisma.item.findMany({
      where: filtro,
      include: { category: true, user: true }, // Use os nomes corretos dos relacionamentos
    });

    res.json(itens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os itens." });
  }

  //const { PrismaClient } = pkg;
};

// Criar um novo item
export const createItem = async (req, res) => {
  try {
    const { name, categoryId, date, location, contact, color, status, userId } = req.body;
    const photo = req.file ? req.file.path : null;
    const code = Math.floor(Math.random() * 1000000); // Gera um número inteiro aleatório

    // Verifique se a categoria e o usuário existem
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id: categoryId },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Crie o item
    const newItem = await prisma.item.create({
      data: {
        code,
        name,
        categoryId,
        date: date ? new Date(date) : undefined,
        location,
        contact,
        color,
        photo,
        status,
        userId,
      },
    });

    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar o item." });
  }
};

// Remover um item
export const deleteItems = async (req, res) => {
  const { code } = req.params;

  if (isNaN(code)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    // Verifica se o item existe
    const item = await prisma.item.findUnique({
      where: { code: parseInt(code) },
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    // Deleta o item
    await prisma.item.delete({
      where: { code: parseInt(code) },
    });

    return res.status(204).json({ message: "Item removido com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao remover o item." });
  }
};

// Atualizar item
export const updateItems = async (req, res) => {
  const { code } = req.params;
  const dadosAtualizados = req.body;

  try {
    // Converta o code para inteiro
    const codeInt = parseInt(code);

    // Verifica se o item existe
    const itemExistente = await prisma.item.findUnique({
      where: { code: codeInt },
    });

    if (!itemExistente) {
      return res.status(404).json({ erro: "Item não encontrado." });
    }

    // Remove o código dos dados se o usuário tentar enviar
    delete dadosAtualizados.code;

    // Atualiza o item
    const itemAtualizado = await prisma.item.update({
      where: { code: codeInt },
      data: dadosAtualizados,
    });

    return res.json(itemAtualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar o item." });
  }
};
