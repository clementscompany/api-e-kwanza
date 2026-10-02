import { DB } from "../config/config.js";
import { createTableSession } from "./sql/sql.js";

export function createDatabase() {
  return new Promise((resolve, reject) => {
    DB.query(createTableSession, (err, response) => {
      if (err) {
        return reject(err.message)
      }
      resolve(response);
      console.log("Base de dados criada com sucesso!");
    })
  })
}