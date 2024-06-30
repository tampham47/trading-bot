import { format, getHours } from 'date-fns';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Market } from '../types/market-data';

import { PRIVATE_KEY, CLIENT_EMAIL, GG_SPREADSHEET_ID } from './auth';

const SHEET_TITLE = 'markets';

export const saveMarketsToGG = async (market: Market) => {
  console.log('saveMarketsToGG: BTCUSDT', market['BTCUSDT']);

  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(GG_SPREADSHEET_ID);

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  });

  // loads document properties and worksheets
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];

  if (!sheet) {
    return -1;
  }

  const total = Object.values(market).length + 2;

  await sheet.loadHeaderRow();
  await sheet.loadCells(`A1:BZ${total}`);

  const ts = new Date();
  const today = format(ts, 'MM/dd/yyyy');
  const hours = getHours(ts);
  const hourBlock = Math.floor(hours / 4);
  const colName = `Price`;
  const colIndex = sheet.headerValues.findIndex((i) => i === colName);
  console.log('today', colName);

  const timestamp = sheet.getCellByA1('B1');
  timestamp.value = Date.now();

  Object.keys(market).forEach((key, rowIndex) => {
    const cell = sheet.getCell(rowIndex + 1, colIndex);
    cell.value = market[key];
  });

  await sheet.saveUpdatedCells();
  return 0;
};
