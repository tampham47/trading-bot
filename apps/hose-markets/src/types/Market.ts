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

export type QuoteMessage = {
  RType: string;
  TradingDate: string;
  TradingTime: string;
  Exchange: string;
  Symbol: string;
  StockNo: string;
  AskPrice1: number;
  AskPrice2: number;
  AskPrice3: number;
  AskPrice4: number;
  AskPrice5: number;
  AskPrice6: number;
  AskPrice7: number;
  AskPrice8: number;
  AskPrice9: number;
  AskPrice10: number;
  AskVol1: string;
  AskVol2: string;
  AskVol3: string;
  AskVol4: string;
  AskVol5: string;
  AskVol6: string;
  AskVol7: string;
  AskVol8: string;
  AskVol9: string;
  AskVol10: string;
  BidPrice1: number;
  BidPrice2: number;
  BidPrice3: number;
  BidPrice4: number;
  BidPrice5: number;
  BidPrice6: number;
  BidPrice7: number;
  BidPrice8: number;
  BidPrice9: number;
  BidPrice10: number;
  BidVol1: string;
  BidVol2: string;
  BidVol3: string;
  BidVol4: string;
  BidVol5: string;
  BidVol6: string;
  BidVol7: string;
  BidVol8: string;
  BidVol9: string;
  BidVol10: string;
  StockType: string;
};

export type TradeMessage = {
  RType: string;
  TradingDate: string;
  Time: string;
  ISin: string;
  Symbol: string;
  Ceiling: number;
  Floor: number;
  RefPrice: number;
  Open: number;
  Close: number;
  High: number;
  Low: number;
  AvgPrice: number;
  PriorVal: number;
  LastPrice: number;
  LastVol: number;
  TotalVal: number;
  TotalVol: number;
  MarketId: string;
  Exchange: string;
  BidPrice1: number;
  BidVol1: number;
  BidPrice2: number;
  BidVol2: number;
  BidPrice3: number;
  BidVol3: number;
  BidPrice4: number;
  BidVol4: number;
  BidPrice5: number;
  BidVol5: number;
  BidPrice6: number;
  BidVol6: number;
  BidPrice7: number;
  BidVol7: number;
  BidPrice8: number;
  BidVol8: number;
  BidPrice9: number;
  BidVol9: number;
  BidPrice10: number;
  BidVol10: number;
  AskPrice1: number;
  AskVol1: number;
  AskPrice2: number;
  AskVol2: number;
  AskPrice3: number;
  AskVol3: number;
  AskPrice4: number;
  AskVol4: number;
  AskPrice5: number;
  AskVol5: number;
  AskPrice6: number;
  AskVol6: number;
  AskPrice7: number;
  AskVol7: number;
  AskPrice8: number;
  AskVol8: number;
  AskPrice9: number;
  AskVol9: number;
  AskPrice10: number;
  AskVol10: number;
  TradingSession: string;
  TradingStatus: string;
  Change: number;
  RatioChange: number;
  EstMatchedPrice: number;
};

export type ForeignRoomMessage = {
  RType: string;
  TradingDate: string;
  Time: string;
  Isin: string;
  Symbol: string;
  TotalRoom: number;
  CurrentRoom: number;
  BuyVol: number;
  SellVol: number;
  BuyVal: number;
  SellVal: number;
  MarketId: string;
  Exchange: string;
};

export type IndexMessage = {
  IndexId: string;
  IndexValue: number;
  PriorIndexValue: number;
  TradingDate: string;
  Time: string;
  TotalTrade: number;
  TotalQtty: number;
  TotalValue: number;
  IndexName: string;
  Advances: number;
  NoChanges: number;
  Declines: number;
  Ceilings: number;
  Floors: number;
  Change: number;
  RatioChange: number;
  TotalQttyPt: number;
  TotalValuePt: number;
  Exchange: string;
  AllQty: number;
  AllValue: number;
  IndexType: string;
  TradingSession: string;
  MarketId: string;
  RType: string;
  TotalQtyOd: number;
  TotalValueOd: number;
};
