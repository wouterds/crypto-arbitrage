const WebSocket = require('ws');

class CoinbaseProTicker {
  constructor() {
    this._ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
  }

  start() {
    this._ws.on('open', () => this._ws.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'ticker', product_ids: ['BTC-USD'] }]
      })
    ));

    this._ws.on('message', (e) => {
      let { price } = JSON.parse(e);

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

module.exports = CoinbaseProTicker;


