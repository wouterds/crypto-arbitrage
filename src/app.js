const BinanceTicker = require('./tickers/binance');
const CoinbaseProTicker = require('./tickers/coinbase-pro');
const BitfinexTicker = require('./tickers/bitfinex');

const binanceTicker = new BinanceTicker();
const coinbaseProTicker = new CoinbaseProTicker();
const bitfinexTicker = new BitfinexTicker();

const start = () => {
  setTimeout(() => binanceTicker.start(), 1);
  setTimeout(() => coinbaseProTicker.start(), 1);
  setTimeout(() => bitfinexTicker.start(), 1);

  setInterval(() => console.log({
    'Binance': binanceTicker.price,
    'Coinbase Pro': coinbaseProTicker.price,
    'Bitfinex': bitfinexTicker.price,
  }), 1000);

  process.stdin.resume();
};

module.exports = {
  start,
};
