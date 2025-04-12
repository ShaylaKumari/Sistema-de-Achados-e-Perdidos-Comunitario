import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/produtores", producerRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is run in PORT ${PORT}...`);
});
