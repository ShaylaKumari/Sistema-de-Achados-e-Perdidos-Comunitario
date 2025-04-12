import { v4 as uuidv4 } from "uuid";
//import { PrismaClient } from "@prisma/client";
/* 
   verificar o import do PrismaClient, aqui no 
   meu eu só consigo usar se for com a importação de baixo
   se caso no seu não funcionar use a importação de cima 
*/
import { PrismaClient } from "../generated/prisma/client.js  ";
import { itemSchema } from "../validators/itemSchema.js";
const prisma = new PrismaClient();

// listar todos os itens
export const getItems = async (_req, res) => {
  try {
    const itens = await prisma.item.findMany({
      include: { categoria: true, usuario: true },
    });
    res.json(itens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar os itens" });
  }
};

// Buscar itens com filtros
export const searchItems = async (req, res) => {
  const { categoria, localizacao, status } = req.query;

  try {
    // Construir o filtro dinamicamente com base nos parâmetros recebidos
    const filtro = {};

    if (categoria) {
      filtro.categoria = {
        nome_categoria: categoria.toLowerCase(), // Normalizar o nome da categoria
      };
    }

    if (localizacao) {
      filtro.localizacao = {
        contains: localizacao, // Busca parcial (case-insensitive)
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
      include: { categoria: true, usuario: true }, // Incluir relacionamentos
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
    const { error, value } = itemSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((d) => d.message) });
    }

    const { name, category, date, location, contact, color, status } = value;
    const photo = req.file ? req.file.path : null;

    const code = uuidv4();

    const newItem = await prisma.item.create({
      data: {
        code,
        name,
        category,
        date: new Date(date),
        location,
        contact,
        color,
        photo,
        status,
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
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    // Verifica se o item existe
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    // Deleta o item
    await prisma.item.delete({
      where: { id: parseInt(id) },
    });

    return res.status(204).json({ message: "Item removido com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao remover o item." });
  }
};
