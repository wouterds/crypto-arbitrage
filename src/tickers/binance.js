const WebSocket = require('ws');

class BinanceTicker {
  constructor() {
    this._ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@miniTicker');
  }

  start() {
    this._ws.on('message', (e) => {
      let { c: price } = JSON.parse(e);

      if (!price) {
        return;
      }

      this._price = parseFloat(price);
    });
  }

  get price() {
    if (!this._price) {
      return '--';
    }

    return this._price.toFixed(2);
  }
}

module.exports = BinanceTicker;
