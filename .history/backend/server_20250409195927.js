import cors from "cors";
import express from "express";
import router from "./src/routes/itemRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
