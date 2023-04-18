import { readFileSync } from 'node:fs';

export const getItems = () => {
  const path = `${__dirname}/../data/item.json`;
  const dataBuffer = readFileSync(path);
  const dataString = dataBuffer.toString();
  const data = JSON.parse(dataString);

  return data;
};
