const chalk = require('chalk');
const _ = require('lodash');
const BinanceTicker = require('./tickers/binance');
const BitfinexTicker = require('./tickers/bitfinex');

const binanceTicker = new BinanceTicker();
const bitfinexTicker = new BitfinexTicker();

const start = () => {
  setTimeout(() => binanceTicker.start(), 1);
  setTimeout(() => bitfinexTicker.start(), 1);

  setInterval(() => {
    let binance = binanceTicker.price;
    let bitfinex = bitfinexTicker.price;

    const max = _.max([binance, bitfinex]);
    const min = _.min([binance, bitfinex]);
    const arb = max - min;

    binance = binance === max ? chalk.green(binance.toFixed(2)) : (binance === min ? chalk.red(binance.toFixed(2)) : chalk.whiteBright(binance.toFixed(2)));
    bitfinex = bitfinex === max ? chalk.green(bitfinex.toFixed(2)) : (bitfinex === min ? chalk.red(bitfinex.toFixed(2)) : chalk.whiteBright(bitfinex.toFixed(2)));

    console.log(`${chalk.white('Binance:')} ${binance} ${chalk.white('Bitfinex:')} ${bitfinex} - ${chalk.white('arbitrage:')} ${chalk.yellowBright(arb.toFixed(2))}`);
  }, 1000);

  process.stdin.resume();
};

module.exports = {
  start,
};
