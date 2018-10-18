const chalk = require('chalk');
const _ = require('lodash');
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

  setInterval(() => {
    let binance = binanceTicker.price;
    let coinbasePro = coinbaseProTicker.price;
    let bitfinex = bitfinexTicker.price;

    const max = _.max([binance, coinbasePro, bitfinex]);
    const min = _.min([binance, coinbasePro, bitfinex]);
    const arb = max - min;

    binance = binance === max ? chalk.green(binance.toFixed(2)) : (binance === min ? chalk.red(binance.toFixed(2)) : chalk.whiteBright(binance.toFixed(2)));
    coinbasePro = coinbasePro === max ? chalk.green(coinbasePro.toFixed(2)) : (coinbasePro === min ? chalk.red(coinbasePro.toFixed(2)) : chalk.whiteBright(coinbasePro.toFixed(2)));
    bitfinex = bitfinex === max ? chalk.green(bitfinex.toFixed(2)) : (bitfinex === min ? chalk.red(bitfinex.toFixed(2)) : chalk.whiteBright(bitfinex.toFixed(2)));

    console.log(`${chalk.white('Binance:')} ${binance} ${chalk.white('Coinbase Pro:')} ${coinbasePro} ${chalk.white('Bitfinex:')} ${bitfinex} - ${chalk.white('arbitrage:')} ${chalk.yellowBright(arb.toFixed(2))}`);
  }, 1000);

  process.stdin.resume();
};

module.exports = {
  start,
};
