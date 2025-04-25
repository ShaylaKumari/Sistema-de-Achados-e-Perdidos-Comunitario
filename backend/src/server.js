import "dotenv/config";
import express from "express";
import routes from "./routes/itemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para processar JSON
app.use("/items", routes);
app.use("/users", userRoutes); // Define o prefixo "/users" para as rotas de usuários
app.use("/categories", categoriaRoutes); // Define o prefixo "/categories" para as rotas de categorias

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
