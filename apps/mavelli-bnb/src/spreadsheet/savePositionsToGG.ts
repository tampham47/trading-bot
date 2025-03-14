import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SheetPosition } from '../types/Position';

import { PRIVATE_KEY, CLIENT_EMAIL, GG_SPREADSHEET_ID } from './auth';

const SHEET_TITLE = 'positions';

export const emptyPosition: SheetPosition = {
  symbol: '',
  quantity: 0,
  avgPrice: 0,
  marketPrice: 0,
};

const getEmptyValue = (value: number, isEmpty: boolean) => {
  if (isEmpty) return '';
  return value;
};

const fillEmptyRow = (positions: SheetPosition[], maxRow: number) => {
  const arr = [];
  for (let i = 0; i < maxRow; i++) {
    arr.push(positions[i] || emptyPosition);
  }
  return arr;
};

export const savePositionsToGG = async (positionsOrg: SheetPosition[]) => {
  const positions = fillEmptyRow(positionsOrg, 100);
  console.log('savePositionsToGG', positionsOrg.length);

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

  await sheet.loadCells(`A2:F${positions.length + 2}`);

  for (let i = 0; i < positions.length; i++) {
    const cellIndex = i + 2;
    const position = positions[i];
    const isEmpty = !position.symbol;
    const now = Date.now();

    const symbol = sheet.getCellByA1(`A${cellIndex}`);
    const sellableQty = sheet.getCellByA1(`B${cellIndex}`);
    const total = sheet.getCellByA1(`C${cellIndex}`);
    const avgPrice = sheet.getCellByA1(`D${cellIndex}`);
    const marketPrice = sheet.getCellByA1(`E${cellIndex}`);
    const timestamp = sheet.getCellByA1(`F${cellIndex}`);

    symbol.value = position.symbol;
    sellableQty.value = getEmptyValue(position.quantity, isEmpty);
    total.value = getEmptyValue(position.quantity, isEmpty);
    avgPrice.value = getEmptyValue(position.avgPrice, isEmpty);
    marketPrice.value = getEmptyValue(position.marketPrice, isEmpty);
    timestamp.value = getEmptyValue(now, isEmpty);
  }

  await sheet.saveUpdatedCells();
  return 0;
};
