import config from '../config';
import { OrderHistory } from '../types/Order';
import { getNumber } from '../utils/number';
import { cancelOrder, getLiveOrder, placeOrder } from './order';
import { getStockPosition } from './position';

export const checkTolerantLoss = (
  tolerant: number,
  avgPrice: number,
  price: number,
) => {
  if (!avgPrice) return false;
  const acceptedPrice = (avgPrice * (100 - tolerant)) / 100;
  return price > acceptedPrice;
};

export const placeBatchOrder = async (
  instrument: string,
  lastPrice: number,
) => {
  const positionList = await getStockPosition();
  const position = positionList.find((i) => i.instrumentID === instrument);
  const strategy = config.strategies.find((i) => i.symbol === instrument);
  const avgPrice = position?.avgPrice || 0;

  if (!strategy) return;

  if (!lastPrice) {
    throw new Error('Unable to get the current price');
  }

  return Promise.all([
    (async () => {
      const buyPrice = getNumber(
        (lastPrice * (100 - strategy.buyLvPrc1)) / 100,
        2,
      );

      const qty =
        !avgPrice || avgPrice < buyPrice
          ? strategy.buyLvQty1
          : strategy.buyLvQty2;

      return placeOrder(instrument, 'B', buyPrice, qty);
    })(),
    (async () => {
      const sellPrice = getNumber(
        (lastPrice * (100 + strategy.sellLvPrc1)) / 100,
        2,
      );

      const qty =
        !avgPrice || avgPrice > sellPrice
          ? strategy.sellLvQty1
          : strategy.sellLvQty2;

      if ((position?.sellableQty || 0) < qty) {
        return;
      }

      if (!checkTolerantLoss(strategy.tolerantLoss, avgPrice, sellPrice)) {
        return;
      }

      return placeOrder(instrument, 'S', sellPrice, qty);
    })(),
  ]);
};

export const cancelAllOrder = async (symbol: string) => {
  const orders = (await getLiveOrder()).filter(
    (i) => i.instrumentID === symbol,
  );
  return Promise.all(orders.map((i: OrderHistory) => cancelOrder(i.orderID)));
};
