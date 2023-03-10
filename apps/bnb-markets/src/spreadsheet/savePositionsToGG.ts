import { format } from 'date-fns';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Market } from '../types/market-data';

import { PRIVATE_KEY, CLIENT_EMAIL, GG_SPREADSHEET_ID } from './auth';

const SHEET_TITLE = 'markets';

export const savePositionsToGG = async (market: Market) => {
  console.log('savePositionsToGG');

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
  await sheet.loadCells(`A1:V${total}`);

  const today = format(new Date(), 'MM/dd/yyyy');
  const colIndex = sheet.headerValues.findIndex((i) => i === today);

  const timestamp = sheet.getCellByA1('B1');
  timestamp.value = Date.now();

  Object.values(market).forEach((price, rowIndex) => {
    const cell = sheet.getCell(rowIndex + 1, colIndex);
    cell.value = price;
  });

  await sheet.saveUpdatedCells();
  return 0;
};
