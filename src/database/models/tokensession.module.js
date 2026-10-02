import { DB } from "../../config/config"

export class TokenSessionModule {
  static deleteSession() {
    return new Promise((resolve, reject) => {
      DB.query("delete from session_system", (err, result) => {
        if (err) {
          return reject(err.message)
        }
        resolve(result);
      })
    })
  }

  static createSession(session) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO session_system set ?`;
      DB.query(sql, [session], (err, result) => {
        if (err) {
          return reject(err.message)
        }

        resolve(result)
      })
    })
  }

  static async getToken() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM session_system ORDER BY id DESC limit 1`;
      DB.query(sql, (err, result) => {
        if (err) {
          return reject(err.message)
        }

        resolve(result[0])
      })
    })
  }
}