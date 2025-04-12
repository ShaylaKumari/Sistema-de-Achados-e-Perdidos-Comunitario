import cors from "cors";
import express from "express";
import router from "./src/routes/itemRoutes.js"; // Certifique-se do caminho correto
const app = express();

app.use(cors());
app.use(express.json());

// Registrar as rotas
app.use("/api/v1/", router); // Agora todas as rotas estarão em /api/item

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
