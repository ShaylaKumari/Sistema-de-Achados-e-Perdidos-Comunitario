import express from "express";
import cor from "cor";

const app = express();

app.use(cors());
app.use(express.json());