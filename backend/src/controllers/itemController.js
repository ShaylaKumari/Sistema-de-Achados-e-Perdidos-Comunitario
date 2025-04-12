import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// listar todos os itens
export const getItems = async (req, res) => {
   try {
      const itens = await prisma.item.findMany({
         include: { categoria: true, usuario: true },
      })
      res.json(itens)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao listar os itens' })
   }
}

// Buscar itens com filtros
export const searchItems = async (req, res) => {
   const { categoria, localizacao, status } = req.query

   try {
      // Construir o filtro dinamicamente com base nos parâmetros recebidos
      const filtro = {}

      if (categoria) {
         filtro.categoria = {
            nome_categoria: categoria.toLowerCase(), // Normalizar o nome da categoria
         }
      }

      if (localizacao) {
         filtro.localizacao = {
            contains: localizacao, // Busca parcial (case-insensitive)
            mode: 'insensitive', // Ignorar maiúsculas/minúsculas
         }
      }

      if (status) {
         if (!['Achado', 'Perdido'].includes(status)) {
            return res
               .status(400)
               .json({
                  error: 'O campo status deve ser "Achado" ou "Perdido".',
               })
         }
         filtro.status = status
      }

      // Buscar itens com base no filtro
      const itens = await prisma.item.findMany({
         where: filtro,
         include: { categoria: true, usuario: true }, // Incluir relacionamentos
      })

      res.json(itens)
   } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Erro ao buscar os itens.' })
   }
}

// Remoção de itens
export const deleteItems = async (req, res) => {
  
   const { id } = req.params; // Apagar itens pelo ID

   try{
      const item = await PrismaClient.itens.delete({
         where: { id: parseInt(id) },
      });

      if (isNaN(id)) {
         return res.status(404).json({ error: 'Item não encontrado.' });
      }

      // Deleta o item do Banco de Dados
      await prisma.item.delete({
         where: { id: parseInt(id) }, // Converte o ID para inteiro
      });

      res.status(204).json({ message: 'Item removido com sucesso.' });
   } catch (error) {      
      res.status(500).json({ error: 'Erro ao remover o item.' });
   }
};
