import { getFutureOrderData, FutureOrderData } from './order';
import { TradeCommand } from '../utils/cmd';

describe('getFutureOrderData', () => {
  test('should calculate future order data for LONG trade', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'BTCUSDT',
      qtyUsd: 1000,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 50000;

    const expected: FutureOrderData = {
      ...cmd,
      price: 50000,
      quantity: 0.02,
      stopLossPrice: 49500,
      takeProfitPrice: 51000,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for SHORT trade', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'ETHUSDT',
      qtyUsd: 500,
      stopLoss: 2,
      takeProfit: 3,
    };
    const currentPrice = 2500;

    const expected: FutureOrderData = {
      ...cmd,
      price: 2500,
      quantity: 0.2,
      stopLossPrice: 2550,
      takeProfitPrice: 2425,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for LONG trade with USDC ticker', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 200;

    const expected: FutureOrderData = {
      ...cmd,
      price: 200,
      quantity: 1,
      stopLossPrice: 198,
      takeProfitPrice: 204,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for SHORT trade with USDC ticker', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 200;

    const expected: FutureOrderData = {
      ...cmd,
      price: 200,
      quantity: 1,
      stopLossPrice: 202,
      takeProfitPrice: 196,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });
});
describe('getFutureOrderData', () => {
  test('should calculate future order data for LONG trade', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'BTCUSDT',
      qtyUsd: 1000,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 50000;

    const expected: FutureOrderData = {
      ...cmd,
      price: 50000,
      quantity: 0.02,
      stopLossPrice: 49500,
      takeProfitPrice: 51000,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for SHORT trade', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'ETHUSDT',
      qtyUsd: 500,
      stopLoss: 2,
      takeProfit: 3,
    };
    const currentPrice = 2500;

    const expected: FutureOrderData = {
      ...cmd,
      price: 2500,
      quantity: 0.2,
      stopLossPrice: 2550,
      takeProfitPrice: 2425,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for LONG trade with USDC ticker', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 200;

    const expected: FutureOrderData = {
      ...cmd,
      price: 200,
      quantity: 1,
      stopLossPrice: 198,
      takeProfitPrice: 204,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for SHORT trade with USDC ticker', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 1,
      takeProfit: 2,
    };
    const currentPrice = 200;

    const expected: FutureOrderData = {
      ...cmd,
      price: 200,
      quantity: 1,
      stopLossPrice: 202,
      takeProfitPrice: 196,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for LONG trade with zero stopLoss and takeProfit', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'BTCUSDT',
      qtyUsd: 1000,
      stopLoss: 0,
      takeProfit: 0,
    };
    const currentPrice = 50000;

    const expected: FutureOrderData = {
      ...cmd,
      price: 50000,
      quantity: 0.02,
      stopLossPrice: 50000,
      takeProfitPrice: 50000,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });

  test('should calculate future order data for SHORT trade with zero stopLoss and takeProfit', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'ETHUSDT',
      qtyUsd: 500,
      stopLoss: 0,
      takeProfit: 0,
    };
    const currentPrice = 2500;

    const expected: FutureOrderData = {
      ...cmd,
      price: 2500,
      quantity: 0.2,
      stopLossPrice: 2500,
      takeProfitPrice: 2500,
    };

    const result = getFutureOrderData(cmd, currentPrice);
    expect(result).toEqual(expected);
  });
});
