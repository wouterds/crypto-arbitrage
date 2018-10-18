const WebSocket = require('ws');

// const ws = new WebSocket('wss://stream.binance.com:9443/ws/BTC/USDT@miniTicker');

// ws.on('message', (e) => {
//   let { c: price } = JSON.parse(e);

//   if (!price) {
//     return;
//   }

//   price = parseFloat(c);
//   price = price.toFixed(2);

//   console.log(price);
// });

const ws = new WebSocket('wss://api.bitfinex.com/ws/2');

ws.on('open', () => ws.send(
  JSON.stringify({
    event: 'subscribe',
    channel: 'ticker',
    symbol: 'tBTCUSD'
  })
));

ws.on('message', (e) => {
  let price = JSON.parse(e);

  if (!Array.isArray(data[1])) {
    return;
  }

  price = parseFloat(data[1][6]);
  price = price.toFixed(2);

  console.log(price);
});
