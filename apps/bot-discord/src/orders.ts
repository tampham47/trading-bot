const { UMFutures } = require('@binance/futures-connector');

const BINANCE_API_KEY = process.env.BINANCE_API_KEY || '';
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET || '';

console.log('BINANCE_API_KEY', BINANCE_API_KEY);
console.log('BINANCE_API_SECRET', BINANCE_API_SECRET);

const umFuturesClient = new UMFutures(BINANCE_API_KEY, BINANCE_API_SECRET, {
  baseURL: 'https://fapi.binance.com',
});

export const placeOrder = async (): Promise<number> => {
  try {
    const batchOrders = [
      {
        symbol: 'BNBUSDT',
        side: 'BUY',
        type: 'LIMIT',
        quantity: '0.1',
        price: '400',
        timeInForce: 'GTC',
      },
      {
        symbol: 'BNBUSDT',
        side: 'SELL',
        type: 'LIMIT',
        quantity: '0.1',
        price: '8000',
        timeInForce: 'GTC',
      },
    ];

    const positionMode = await umFuturesClient.getPositionMode();
    console.log('Position Mode:', positionMode.data);

    // const response = await umFuturesClient.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
    //   quantity: '0.1',
    //   price: '400',
    //   timeInForce: 'GTC',
    // });

    // console.log('Market Order Response:', response.data);
    return 0;
  } catch (error) {
    console.log('Error:', error);
    return -1;
  }
};
