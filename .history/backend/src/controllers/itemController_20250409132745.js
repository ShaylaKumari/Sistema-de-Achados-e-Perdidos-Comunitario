import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { itemSchema } from "../validators/itemSchema.js";

const prisma = new PrismaClient();

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
