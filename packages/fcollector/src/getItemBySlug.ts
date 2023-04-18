import { getItems } from './getItems';

export const getItemBySlug = (slug: string) => {
  const items = getItems();

  return items.find((singItem: any) => singItem.slug === slug);
};
