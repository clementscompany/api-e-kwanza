# api-e-kwanza

# como usar ?

```sh
POST: {{server}}/api/v1/charges
```
- Corpo da Requisicao:
```sh
# estrutura dos dados a enviar
{
    "amount": 3000, # valor a pagar
    "description": "POSTMAN_Test" # Descricao ou OBS: EX Pagamento do servico X Y
}
```
- Resposta:

```sh
{
    "success": true,
    "message": "Referencia Criada com sucesso!",
    "result": {
        "transacao_id": "906762f8-b97e-4462-b478-4f1928232f47",
        "status_transacao": "Pending",
        "codigo_movimento": 101,
        "tipo_pagamento": "REF",
        "numero_referencia": "750247790",
        "entidade": "00348",
        "data_prazo_pagamento": "2026-10-05T16:42:19.7972001+00:00",
        "iban": null
    }
}
```
