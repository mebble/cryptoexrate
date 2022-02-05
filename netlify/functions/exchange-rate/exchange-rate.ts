import 'dotenv/config'
import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {
  const ticker = (event.queryStringParameters['ticker'] || 'btc').toLowerCase()

  let response;
  try {
    response = await fetch(`${process.env.CRYPTO_HOST}/mcapi/v1/cryptoex/list`)
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        data: {
          message: 'Error from upstream'
        }
      })
    }
  }

  if (!response.ok) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        data: {
          message: 'Bad request'
        }
      })
    }
  }
  
  const data = await response.json()
  const coin = data.data.exchangeData.find(item => item.baseAsset === ticker)
  if (coin === undefined) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        data: {
          ticker,
          message: 'Coin not found'
        }
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      data: {
        pair: `${ticker.toUpperCase()}/INR`,
        open: coin.openPrice,
        high: coin.highPrice,
        low: coin.lowPrice,
        latest: coin.lastPrice,
        volume: coin.volume
      }
    }),
  }
}
