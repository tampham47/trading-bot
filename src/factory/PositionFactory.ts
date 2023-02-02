import { orderBy, trim, uniq } from 'lodash';
import { getStockPosition } from '../biz/position';
import { Strategy } from '../strategies';

import BalanceFactory from './BalanceFactory';
import { StockPosition } from '../types/Position';
import { roundByDp } from '../utils/number';
import { MAX_ORDER } from '../consts';
import { MavelliConfig } from '../types/Mavelli';

const defaultPosition: StockPosition = {
  instrumentID: '',
  marketID: '',
  onHand: 0,
  block: 0,
  bonus: 0,
  buyT0: 0,
  buyT1: 0,
  buyT2: 0,
  sellT0: 0,
  sellT1: 0,
  sellT2: 0,
  avgPrice: 0,
  mortgage: 0,
  sellableQty: 0,
  holdForTrade: 0,
  marketPrice: 0,
  total: 0,
  value: 0,
  allocation: 0,
  target: 0,
  buying: false,
};

const normalizeStrategies = (
  positions: StockPosition[],
  strategies: Strategy[],
  totalBalance = 0,
) => {
  const list = uniq([
    ...positions.map((i) => i.instrumentID),
    ...strategies.map((i) => i.symbol),
  ]);
  return list.map((symbol) => {
    const item = positions.find((i) => i.instrumentID === symbol) || {
      ...defaultPosition,
      instrumentID: symbol,
    };
    const strategy = strategies.find((s) => s.symbol === item.instrumentID) || {
      allocation: 0,
      active: false,
    };
    const target = strategy.allocation;
    const allocation = !totalBalance
      ? 0
      : roundByDp(((item.value || 0) / totalBalance) * 100, 2);

    return {
      ...item,
      allocation,
      target,
      buying: strategy.active ? allocation < target : false,
    };
  });
};

class PositionFactory {
  positions: StockPosition[] = [];
  strategies: Strategy[] = [];
  buyingList: string[] = [];
  maxOrder = MAX_ORDER;
  priorityList: string[] = [];
  ignoreIndividualConfig = false;

  update = async () => {
    if (!this.strategies.length) return;

    const positions = await getStockPosition();
    this.positions = normalizeStrategies(
      positions,
      this.strategies,
      BalanceFactory.getTotalAsset(),
    );
    this.getBuyingList();
    return this.positions;
  };

  setConfig = (config: MavelliConfig) => {
    if (config.maxOrder) {
      this.maxOrder = config.maxOrder;
    }

    if (config.priorityList) {
      this.priorityList = config.priorityList.split(',').map((i) => trim(i));
    }

    if (config.ignoreIndividualConfig) {
      this.ignoreIndividualConfig = config.ignoreIndividualConfig;
    }

    this.getBuyingList();
  };

  setStrategies = (strategies: Strategy[]) => {
    this.strategies = strategies;
    this.positions = normalizeStrategies(
      this.positions,
      this.strategies,
      BalanceFactory.getTotalAsset(),
    );
    this.getBuyingList();
  };

  getBuyingList = () => {
    // disabled buying if maxOrder = 0
    if (!this.maxOrder) return [];

    const symbols = orderBy(
      this.positions.filter((i) => i.buying),
      ['target', 'allocation'],
      ['desc', 'asc'],
    )
      .slice(0, this.maxOrder)
      .map((i) => i.instrumentID);

    this.buyingList = uniq([...this.priorityList, ...symbols]).slice(
      0,
      this.maxOrder,
    );
    return this.buyingList;
  };

  checkIsBuyingStock = (symbol: string) => {
    return this.buyingList.join(', ').indexOf(symbol) >= 0;
  };

  getBySymbol = (symbol: string) => {
    return this.positions.find((i) => i.instrumentID === symbol);
  };
}

export default new PositionFactory();
