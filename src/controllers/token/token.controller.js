import { DB } from "../../config/config.js";
import { TokenSessionModule } from "../../database/models/tokensession.module.js";
import env from "dotenv";
env.config();

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
      console.log("Buscando Dados da ultima sessao...");
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
          signal: AbortSignal.timeout(30000)
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

      const last_timestep = lastSession.expires_on
      const current_timestemp = Math.floor(Date.now() / 1000);
      const expirado = current_timestemp > (last_timestep - 60);

      if (expirado) {
        console.log("Sessao expirada em: " + new Date(lastSession * 1000).toLocaleDateString("pt-BR", {
          day: "2-digit",
          weekday: "long",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: '2-digit'
        }));
        await TokenSessionModule.deleteSession();
      }
      console.info('Sessão ativa');     
    } catch (error) {
      console.error("Erro ao processar os dados da api")
      console.error(new Error(error.message))
      console.log(error);
    }
  }
}
