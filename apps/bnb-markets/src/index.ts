/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { throttle } from 'lodash';

import { client } from './client';
import { MarketConfig } from './types/market-config';
import { Trade } from './types/trade';
import { loadStrategies } from './spreadsheet/loadStrategies';
import { saveMarketsToGG } from './spreadsheet/saveMarketsToGG';
import { Market } from './types/market-data';

dotenv.config();

let AGG_STRATEGIES: MarketConfig[];
const MARKETS: Market = {};
const SYNC_MARKETS_INTERVAL = 120000; // 2 mins

client.time().then((time) => {
  console.log('STARTED', time);
});

const onLastPrice = (trade: Trade) => {
  const symbol = trade.symbol;
  const price = trade.price;
  MARKETS[symbol] = price;
};

const syncPositions = () => {
  saveMarketsToGG(MARKETS);
};

(async () => {
  AGG_STRATEGIES = await loadStrategies();
  console.table(AGG_STRATEGIES);

  AGG_STRATEGIES.map(async (i: MarketConfig) => {
    const onTradeThrottle = throttle(onLastPrice, 2000);

    MARKETS[i.symbol] = 0;

    client.ws.trades(i.symbol, (data: any) => {
      const trade: Trade = {
        ...data,
        price: parseFloat(data.price),
        qty: parseFloat(data.quantity),
      };

      onTradeThrottle(trade);
    });
  });

  syncPositions();

  setInterval(() => {
    syncPositions();
  }, SYNC_MARKETS_INTERVAL);
})();
