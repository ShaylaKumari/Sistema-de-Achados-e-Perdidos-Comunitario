import { v4 as uuidv4 } from "uuid";
//import { PrismaClient } from "@prisma/client";
/* verificar o import do PrismaClient */
import { PrismaClient } from "../generated/prisma/client.js  ";
import itemSchema from "../validators/itemSchema.js";
const prisma = new PrismaClient();

// listar todos os itens
const getItems = async (_req, res) => {
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
const searchItems = async (req, res) => {
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
const createItem = async (req, res) => {
  try {
    const { error, value } = itemSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((d) => d.message) });
    }

    const { name, category, date, location, contact, color, status } = value;
    const photo = req.file ? req.file.path : null;

    // Geração de código único
    const code = uuidv4();

    // Inserir no banco com Prisma
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
export default {
  getItems,
  searchItems,
  createItem,
};
//import { PrismaClient } from "@prisma/client";
//import { PrismaClient } from "../generated/prisma/client.js";
//import pkg from "@prisma/client";
