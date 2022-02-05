import 'dotenv/config'
import { Handler, HandlerResponse } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {
  const ticker = (event.queryStringParameters['ticker'] || 'btc').toLowerCase()

  let response;
  try {
    response = await fetch(`${process.env.CRYPTO_HOST}/mcapi/v1/cryptoex/list`)
  } catch {
    return buildResponse(500, {
      message: 'Error from upstream'
    })
  }

  if (!response.ok) {
    return buildResponse(400, {
      ticker,
      message: 'Bad request'
    })
  }
  
  const data = await response.json()
  const coin = data.data.exchangeData.find(item => item.baseAsset === ticker)
  if (coin === undefined) {
    return buildResponse(404, {
      ticker,
      message: 'Coin not found'
    })
  }

  return buildResponse(200, {
    pair: `${ticker.toUpperCase()}/INR`,
    open: coin.openPrice,
    high: coin.highPrice,
    low: coin.lowPrice,
    last: coin.lastPrice,
    volume: coin.volume
  })
}

function buildResponse(statusCode: number, data: any): HandlerResponse {
  return {
    statusCode,
    body: JSON.stringify({
      success: statusCode >= 200 && statusCode < 400,
      data,
    })
  };
}