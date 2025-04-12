import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/items", (req, res)=>{
  return res.json("O")
})
app.listen(PORT, () => {
  console.log(`Server is run in PORT ${PORT}...`);
});
