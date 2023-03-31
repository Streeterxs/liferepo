import * as items from '../data/item.json';

export const getItemBySlug = (slug: string) =>
  items.find((singItem: any) => singItem.slug === slug);
