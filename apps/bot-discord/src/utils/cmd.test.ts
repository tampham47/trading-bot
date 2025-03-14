import { parseTradeCommand, getCmdString, TradeCommand } from './cmd';

describe('parseTradeCommand', () => {
  test('should parse a valid trade command', () => {
    const message = '> long BTC 1000 0.01 0.02';
    const expected: TradeCommand = {
      side: 'LONG',
      ticker: 'BTCUSDT',
      qtyUsd: 1000,
      stopLoss: 0.01,
      takeProfit: 0.02,
    };

    const result = parseTradeCommand(message);
    expect(result).toEqual(expected);
  });

  test('should parse a valid trade command with USDT ticker', () => {
    const message = '> short ETHUSDT 500 0.02 0.03';
    const expected: TradeCommand = {
      side: 'SHORT',
      ticker: 'ETHUSDT',
      qtyUsd: 500,
      stopLoss: 0.02,
      takeProfit: 0.03,
    };

    const result = parseTradeCommand(message);
    expect(result).toEqual(expected);
  });

  test('should parse a valid trade command with USDC ticker', () => {
    const message = '> long LTCUSDC 200 0.01 0.02';
    const expected: TradeCommand = {
      side: 'LONG',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 0.01,
      takeProfit: 0.02,
    };

    const result = parseTradeCommand(message);
    expect(result).toEqual(expected);
  });

  test('should handle missing ticker and append USDT', () => {
    const message = '> long LTC 200 0.01 0.02';
    const expected: TradeCommand = {
      side: 'LONG',
      ticker: 'LTCUSDT',
      qtyUsd: 200,
      stopLoss: 0.01,
      takeProfit: 0.02,
    };

    const result = parseTradeCommand(message);
    expect(result).toEqual(expected);
  });

  test('should handle invalid command format', () => {
    const message = '> invalid command';
    expect(parseTradeCommand(message)).toEqual(null);
  });
});

describe('getCmdString', () => {
  test('should generate a valid command string for LONG trade', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'BTCUSDT',
      qtyUsd: 1000,
      stopLoss: 0.01,
      takeProfit: 0.02,
    };

    const result = getCmdString(cmd);
    expect(result).toBe('Trade: LONG BTCUSDT 1000 0.01 0.02');
  });

  test('should generate a valid command string for SHORT trade', () => {
    const cmd: TradeCommand = {
      side: 'SHORT',
      ticker: 'ETHUSDT',
      qtyUsd: 500,
      stopLoss: 0.02,
      takeProfit: 0.03,
    };

    const result = getCmdString(cmd);
    expect(result).toBe('Trade: SHORT ETHUSDT 500 0.02 0.03');
  });

  test('should generate a valid command string with USDC ticker', () => {
    const cmd: TradeCommand = {
      side: 'LONG',
      ticker: 'LTCUSDC',
      qtyUsd: 200,
      stopLoss: 0.01,
      takeProfit: 0.02,
    };

    const result = getCmdString(cmd);
    expect(result).toBe('Trade: LONG LTCUSDC 200 0.01 0.02');
  });
});
