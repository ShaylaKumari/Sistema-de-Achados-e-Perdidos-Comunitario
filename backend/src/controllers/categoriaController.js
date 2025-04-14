import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const deleteItems = async (req, res) => {
  const { code } = req.params;

  try {
    // Verifica se o item existe
    const item = await prisma.item.findUnique({
      where: { code },
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    // Deleta o item
    await prisma.item.delete({
      where: { code },
    });

    return res.status(204).json({ message: "Item removido com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao remover o item." });
  }
};

// Listar todas as categorias
export const getCategorias = async (_req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      include: { itens: true }, // Inclui os itens relacionados à categoria
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar as categorias." });
  }
};

// Buscar uma categoria por ID
export const getCategoriaById = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
      include: { itens: true }, // Inclui os itens relacionados à categoria
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a categoria." });
  }
};

// Criar uma nova categoria
export const createCategoria = async (req, res) => {
  const { name } = req.body;

  try {
    const novaCategoria = await prisma.categoria.create({
      data: {
        name,
      },
    });

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a categoria." });
  }
};

// Atualizar uma categoria
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    const categoriaAtualizada = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });

    res.json(categoriaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a categoria." });
  }
};

// Remover uma categoria
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id: parseInt(id) },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    await prisma.categoria.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).json({ message: "Categoria removida com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover a categoria." });
  }
};