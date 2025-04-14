import cors from "cors";
import express from "express";
import router from "./src/routes/itemRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/itens", router);
app.use("/api/users", userRoutes);
app.use("/api/categorias", categoriaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
