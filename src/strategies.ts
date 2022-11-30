import { roundByDp } from './utils/number';

const m15 = 900000;
const delta = 1.25;

export const INTERVAL = {
  m01: 60000,
  m10: 600000, // 10 mins
  m15: 900000, // 15 mins
  m20: 1200000, // 20 mins
  m30: 1800000, // 30 mins
  m45: 2700000, // 45 mins
  m60: m15 * 4,
  h02: m15 * 8,
  h04: m15 * 16,
};

export type Strategy = {
  symbol: string;
  interval: number;
  buyPrc: number;
  buyQty1: number;
  buyQty2: number;
  takeProfit: number;
  allocation: number;
  active: boolean;
  tickSize: number;
};

export const based: Strategy = {
  symbol: '',
  interval: INTERVAL.m60,
  buyPrc: roundByDp(-2.55 * delta, 2),
  buyQty1: 100,
  buyQty2: 100,
  takeProfit: 2.25,
  allocation: 1,
  active: false,
  tickSize: 2,
};

export const strategies: Strategy[] = [
  {
    ...based,
    symbol: 'SSI',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-2.25 * delta, 2),
    takeProfit: 20.5,
    buyQty1: 400,
    buyQty2: 600,
    allocation: 20,
    active: true,
  },
  {
    ...based,
    symbol: 'BID',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.25 * delta, 2),
    takeProfit: 10.5,
    buyQty1: 200,
    buyQty2: 200,
    allocation: 15,
    active: true,
  },
  {
    ...based,
    symbol: 'TCB',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-2.25 * delta, 2),
    takeProfit: 5.5,
    buyQty1: 200,
    buyQty2: 300,
    allocation: 10,
    active: true,
  },
  {
    ...based,
    symbol: 'MSN',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.45 * delta, 2),
    buyQty1: 200,
    buyQty2: 200,
    allocation: 10,
    active: true,
  },
  {
    ...based,
    symbol: 'VNM',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.45 * delta, 2),
    buyQty1: 200,
    buyQty2: 200,
    allocation: 15,
    active: true,
  },
  {
    ...based,
    symbol: 'VHC',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-2.25 * delta, 2),
    buyQty1: 200,
    buyQty2: 200,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'HAG',
    interval: INTERVAL.m60,
    buyPrc: roundByDp(-2.45 * delta, 2),
    buyQty1: 200,
    buyQty2: 400,
    allocation: 5,
    active: true,
  },
  {
    ...based,
    symbol: 'FPT',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.25 * delta, 2),
    buyQty1: 100,
    buyQty2: 100,
    allocation: 5,
    active: true,
  },
  {
    ...based,
    symbol: 'HPG',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.55 * delta, 2),
    buyQty1: 200,
    buyQty2: 400,
    allocation: 10,
    active: true,
  },
  {
    ...based,
    symbol: 'REE',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.75 * delta, 2),
    buyQty1: 100,
    buyQty2: 100,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'VCB',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.15 * delta, 2),
    buyQty1: 100,
    buyQty2: 100,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'MBB',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.85 * delta, 2),
    buyQty1: 300,
    buyQty2: 300,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'DGC',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.85 * delta, 2),
    buyQty1: 300,
    buyQty2: 500,
    allocation: -1,
    active: true,
  },
  {
    ...based,
    symbol: 'CTG',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.85 * delta, 2),
    buyQty1: 200,
    buyQty2: 200,
    allocation: -1,
    active: true,
  },
  {
    ...based,
    symbol: 'DCM',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.95 * delta, 2),
    buyQty1: 200,
    buyQty2: 200,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'TPB',
    interval: INTERVAL.m45,
    buyQty1: 200,
    buyQty2: 200,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'MWG',
    interval: INTERVAL.m45,
    buyQty1: 100,
    buyQty2: 100,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'GVR',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.75 * delta, 2),
    buyQty1: 500,
    buyQty2: 500,
    allocation: 5,
    active: true,
  },
  {
    ...based,
    symbol: 'VIC',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-1.75 * delta, 2),
    buyQty1: 100,
    buyQty2: 100,
    allocation: 5,
    active: true,
  },
  {
    ...based,
    symbol: 'NVL',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-3.25 * delta, 2),
    buyQty1: 200,
    buyQty2: 300,
    allocation: 1,
    active: true,
  },
  {
    ...based,
    symbol: 'KDH',
    interval: INTERVAL.m45,
    buyPrc: roundByDp(-3.25 * delta, 2),
    buyQty1: 300,
    buyQty2: 400,
    allocation: 1,
    active: true,
  },
];
