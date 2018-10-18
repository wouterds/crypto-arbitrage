const WebSocket = require('ws');

class BitfinexTicker {
  constructor() {
    this._ws = new WebSocket('wss://api.bitfinex.com/ws/2');
  }

  start() {
    this._ws.on('open', () => this._ws.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
      })
    ));

    this._ws.on('message', (e) => {
      let price = JSON.parse(e);

      if (!Array.isArray(price[1])) {
        return;
      }

      this._price = parseFloat(price[1][6]);
    });
  }

  get price() {
    if (!this._price) {
      return -1;
    }

    return this._price;
  }
}

module.exports = BitfinexTicker;


