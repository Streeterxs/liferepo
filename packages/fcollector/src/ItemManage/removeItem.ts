import items from '../../data/item.json';
import { writeFile } from 'node:fs/promises';
import { getItemBySlug } from '../getItemBySlug';

export const removeItem = async (slug: string) => {
  const path = `${__dirname}/../data/item.json`;

  const hasItem = getItemBySlug(slug);
  if (!hasItem) {
    console.log('Given slug do not exists');
    return;
  }
  const newItems = items.filter((item) => item.slug !== slug);

  const newItemsString = JSON.stringify(newItems);
  writeFile(path, newItemsString);
};
