import * as items from '../data/item.json';
export const getAllSlugs = () => items.map((item) => item.slug);
