# CryptoExRate

[![Netlify Status](https://api.netlify.com/api/v1/badges/1cf4049a-38a8-431f-b46e-458702ae81b4/deploy-status)](https://app.netlify.com/sites/cryptoexrate/deploys)

## Documentation

| API  | Params | Example |
| ---- | ------ | ------- |
| `GET /.netlify/functions/exchange-rate` | `ticker` |  [/.netlify/functions/exchange-rate?ticker=ETH](https://cryptoexrate.netlify.app/.netlify/functions/exchange-rate?ticker=ETH)  |

## Development

Set the environment variables in a `.env` file. Contents:

```
CRYPTO_HOST=https://example.com
```

Use [Netlify CLI](https://docs.netlify.com/cli/get-started/) for development in your local machine.

Run functions locally in development mode:

```bash
netlify functions:serve
```
