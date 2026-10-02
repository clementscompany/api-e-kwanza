import { DB } from "../../config/config.js";
import dotenv from "dotenv";
import { TokenSessionModule } from "../../database/models/tokensession.module.js";
dotenv.config();

export class TokenController {
  static async RefreshTokenAsync() {
    const getDatabase = new Promise((resolve, reject) => {
      DB.query("select * from session_system order by id desc limit 1", (err, data) => {
        if (err) {
          return reject(err.message)
        }

        resolve(data[0])
      });
    });

    try {
      const lastSession = await getDatabase || null;

      if (!lastSession) {
        const url_params = new URLSearchParams();
        url_params.append("grant_type", "client_credentials");
        url_params.append("client_id", process.env.CLIENT_ID);
        url_params.append("client_secret", process.env.CLIENT_SECRET);
        url_params.append("resource", process.env.RESOURCE);

        const getData = await fetch(process.env.OAUTH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: url_params,
        });
        if (!getData.ok) {
          console.error(await getData.text());
          return;
        }
        const response = await getData.json();
        const {
          expires_in,
          ext_expires_in,
          expires_on,
          not_before,
          access_token
        } = response;

        await TokenSessionModule.createSession({
          expires_in,
          expires_on,
          ext_expires_in,
          not_before,
          access_token
        });

        return;
      }


      const current_time = new Date.now();



    } catch (error) {
      console.error("Erro ao processar os dados da api")
      console.error(new Error(error.message))
      console.log(error);
    }
  }
}