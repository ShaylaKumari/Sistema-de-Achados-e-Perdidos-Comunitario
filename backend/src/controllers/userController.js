import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

import { prisma } from "../database/PrismaClient.js";

export const findAllUsers = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const userId = parseInt(id);

      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const user = await prisma.usuario.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          isAdmin: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      return res.status(200).json(user);
    }
   
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        isAdmin: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Criar um novo usuário
export const createUser = async (req, res) => {
  const { name, phone, email, isAdmin = false, password } = req.body;

  try {   
    const userCheck = await prisma.usuario.findUnique({
      where: { email },
    });

    if (userCheck) {
      return res.status(409).json({ error: "E-mail já cadastrado!" });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
   
    const user = await prisma.usuario.create({
      data: {
        name,
        phone,
        email,
        isAdmin: Boolean(isAdmin),
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        isAdmin: true,
      },
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar o usuário." });
  }
};

// Atualizar um usuário
export const updateUser = async (req, res) => {
  const { name, email, phone, isAdmin, password } = req.body;
  const { id } = req.params;

  try {
    const dataToUpdate = {};

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (phone) dataToUpdate.phone = phone;
    if (typeof isAdmin === "boolean") dataToUpdate.isAdmin = isAdmin;
    if (password) dataToUpdate.password = bcrypt.hashSync(password, 10);

    const user = await prisma.usuario.update({
      where: { id: Number(id) }, // Garantir que é número, porque o params é string
      data: dataToUpdate,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
};

// Remover um usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const user = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await prisma.usuario.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: "Usuário removido com sucesso." });

  } catch (error) {
    console.error("Erro ao remover o usuário:", error);
    return res.status(500).json({ error: "Erro ao remover o usuário." });
  }
};

export const findUserAndItems = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        itens: {
          select: {
            code: true,
            name: true,
            date: true,
            location: true,
            contact: true,
            color: true,
            status: true,
            photo: true,
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário e itens:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};