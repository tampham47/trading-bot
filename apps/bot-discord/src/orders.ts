import { PortfolioClient } from 'binance';

const BINANCE_API_KEY = process.env.BINANCE_API_KEY || '';
const BINANCE_API_SECRET = process.env.BINANCE_API_SECRET || '';

console.log('BINANCE_API_KEY', BINANCE_API_KEY);
console.log('BINANCE_API_SECRET', BINANCE_API_SECRET);

const pmClient = new PortfolioClient({
  api_key: BINANCE_API_KEY,
  api_secret: BINANCE_API_SECRET,
});

export const placeOrder = async (): Promise<number> => {
  try {
    const resp = await pmClient.testConnectivity();
    return 0;
  } catch (error) {
    console.log('Error:', error);
    return -1;
  }
};
