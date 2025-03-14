export const m15 = 900000;

export const INTERVAL = {
  m01: 60000,
  m10: 600000, // 10 mins
  m15: 900000, // 15 mins
  m20: 1200000, // 20 mins
  m30: 1800000, // 30 mins
  m45: 2700000, // 45 mins
  m60: 3600000,
  h02: m15 * 8,
  h04: m15 * 16,
};

export type Strategy = {
  symbol: string;
  interval: number;
  buyPrice: number;
  buyQuantity: number;
  holdQuantity: number;
  takeProfit: number;
  allocation: number;
  active: boolean;
  tickSize: number;
  marketPrice: number;
};

export const based: Strategy = {
  symbol: '',
  interval: INTERVAL.m60,
  buyPrice: -2.55,
  buyQuantity: 100,
  takeProfit: 2.45,
  holdQuantity: 100,
  allocation: 1,
  active: false,
  tickSize: 2,
  marketPrice: 0,
};
