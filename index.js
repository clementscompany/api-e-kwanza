import express from "express";
import { Route } from "./src/routes/Route.js";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import { createDatabase } from "./src/database/db.js";
import { TokenController } from "./src/controllers/token/token.controller.js";

dotenv.config();
const app = express();
const port = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST", "PUT", "PATSH", "DELETE", "OPTIONS"],
  origin: "*",
}));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Seja Bem Vindo!",
    details: {
      endpoint: "api/v1"
    }
  })
})

app.use("/api/v1", Route);
app.listen(port, () => { console.log("http://localhost:5001"); })

//// ccorn
cron.schedule("*/10 * * * * *", () => {
  TokenController.RefreshTokenAsync();
});

createDatabase();
