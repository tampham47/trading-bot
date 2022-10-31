export type DailyStockPrice = {
  TradingDate: string;
  Symbol: string;
  PriceChange: string;
  PerPriceChange: string;
  CeilingPrice: string;
  FloorPrice: string;
  RefPrice: string;
  OpenPrice: string;
  HighestPrice: string;
  LowestPrice: string;
  ClosePrice: string;
  AveragePrice: string;
  ClosePriceAdjusted: string;
  TotalMatchVol: string;
  TotalMatchVal: string;
  TotalDealVal: string;
  TotalDealVol: string;
  ForeignBuyVolTotal: string;
  ForeignCurrentRoom: string;
  ForeignSellVolTotal: string;
  ForeignBuyValTotal: string;
  ForeignSellValTotal: string;
  TotalBuyTrade: string;
  TotalBuyTradeVol: string;
  TotalSellTrade: string;
  TotalSellTradeVol: string;
  NetForeignVol: string;
  NetForeignVal: string;
  TotalTradedVol: string;
  TotalTradedValue: string;
};

export type TradingSession =
  | 'ATO' // Opening Call Auction
  | 'LO' // Continuous Trading
  | 'ATC' // Closing All Auction
  | 'PT' // Put Through
  | 'C' // Market Close
  | 'BREAK' // Lunch Break
  | 'HALT'; // Market Halt
