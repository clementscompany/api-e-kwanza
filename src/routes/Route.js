import express from "express";
import { ChargesController } from "../controllers/charges/Charges.controller.js";


const Route = express.Router();

Route.post("/charges", ChargesController.CreateChargeReference)
export { Route }