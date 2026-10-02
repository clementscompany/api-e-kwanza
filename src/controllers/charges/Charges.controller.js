import { TokenSessionModule } from "../../database/models/tokensession.module.js";
import dotenv from "dotenv";
dotenv.config();


export class ChargesController {
  static async CreateChargeReference(req, res) {
    try {
      const { amount, description } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valor inválido."
        });
      }

      if (!description) {
        return res.status(400).json({
          success: false,
          message: "Descrição é obrigatória."
        });
      }
      const merchantTransactionId = `RF${Math.floor(
        Math.random() * 10_000_000_000_000
      )
        .toString()
        .padStart(13, "0")}`;
      const paymentMethod = process.env.REF_PAYMENT;
      const options = {
        MerchantIdentifier: process.env.ACOUNT_NUMBER,
        ApiKey: process.env.API_KEY
      }
      const getDatabase = await TokenSessionModule.getToken();
      const { access_token } = getDatabase;

      const BODY_PARSER = {
        amount,
        currency: "AOA",
        description,
        merchantTransactionId,
        paymentMethod,
        options,
      }

      const URL = process.env.API_URL + "/charges";
      const getReference = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(BODY_PARSER),
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        }
      });

      if (!getReference.ok) {
        res.status(getReference.status).json({
          success: false,
          message: 'Erro: ' + getReference.status,
          details: await getReference.json(),
        });
        return;
      }

      const { id, responseStatus: {
        successful,
        status,
        code,
        source,
        reference: {
          referenceNumber,
          dueDate,
          entity,
          nib,
        }
      } } = await getReference.json();

      res.status(200).json({
        success: successful,
        message: "Referencia Criada com sucesso!",
        result: {
          transacao_id: id,
          status_transacao: status,
          codigo_movimento: code,
          tipo_pagamento: source,
          numero_referencia: referenceNumber,
          entidade: entity,
          data_prazo_pagamento: dueDate,
          iban: nib,
        }
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: new Error(error).message,
        details: error,
      })
    }
  }


  ///// pagamento por numero de telefone 
  static async CreateChargeReference(req, res) {
    try {
      const { amount, description } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valor inválido."
        });
      }

      if (!description) {
        return res.status(400).json({
          success: false,
          message: "Descrição é obrigatória."
        });
      }
      const merchantTransactionId = `RF${Math.floor(
        Math.random() * 10_000_000_000_000
      )
        .toString()
        .padStart(13, "0")}`;
      const paymentMethod = process.env.REF_PAYMENT;
      const options = {
        MerchantIdentifier: process.env.ACOUNT_NUMBER,
        ApiKey: process.env.API_KEY
      }
      const getDatabase = await TokenSessionModule.getToken();
      const { access_token } = getDatabase;

      const BODY_PARSER = {
        amount,
        currency: "AOA",
        description,
        merchantTransactionId,
        paymentMethod,
        options,
      }

      const URL = process.env.API_URL + "/charges";
      const getReference = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(BODY_PARSER),
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        }
      });

      if (!getReference.ok) {
        res.status(getReference.status).json({
          success: false,
          message: 'Erro: ' + getReference.status,
          details: await getReference.json(),
        });
        return;
      }

      const example = await getReference.json();

      res.status(200).json({
        success: successful,
        message: "Referencia Criada com sucesso!",
        example,
        result: {

        }
      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: new Error(error).message,
        details: error,
      })
    }
  }
}