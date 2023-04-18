import { getItems } from './getItems';

export const getAllSlugs = () => {
  const items = getItems();

  return items.map((item: any) => item.slug);
};
