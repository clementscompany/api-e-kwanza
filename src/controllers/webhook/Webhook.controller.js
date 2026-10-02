export class WebhookController {
  static async Listen(req, res) {
    const data = req.body;
    console.log("Escutando o evento:", data);
  }
}