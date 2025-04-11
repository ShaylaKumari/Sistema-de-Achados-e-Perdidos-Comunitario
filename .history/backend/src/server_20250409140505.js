import cors from "cors";
import express from "express";
import router from "./routes/itemRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is run in PORT ${PORT}...`);
});
