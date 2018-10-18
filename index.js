const WebSocket = require('ws');

const ws = new WebSocket('wss://stream.binance.com:9443/ws/BTC/USDT@miniTicker');

ws.on('message', (e) => {
  let { c: price } = JSON.parse(e);

  if (!price) {
    return;
  }

  price = parseFloat(c);
  price = price.toFixed(2);

  console.log(price);
});
