import items from '../data/item.json'

export const getItemBySlug = (slug: string) =>
  items.find((singItem) => singItem.slug === slug)
