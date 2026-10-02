import express from "express";
import { ChargesController } from "../controllers/charges/Charges.controller.js";
import { WebhookController } from "../controllers/webhook/Webhook.controller.js";


const Route = express.Router();

Route.post("/charges", ChargesController.CreateChargeReference);
Route.post("/charges/gpo", ChargesController.CreateChargeReferenceGpo);
Route.post("/webhook", WebhookController.Listen);

export { Route }