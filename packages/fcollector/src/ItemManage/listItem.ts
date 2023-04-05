import { getItemBySlug } from '../getItemBySlug';
import { getAllSlugs } from '../getAllSlugs';

export const listItem = (slug: string) => {
  if (!slug) {
    const slugs = getAllSlugs();
    console.log('All slugs: ');
    console.log(slugs);
    return;
  }

  const item = getItemBySlug(slug);
  if (!item) {
    console.log('Given slug do not exists in local data storage');
    return;
  }

  console.log('Item found by slug: ');
  console.log(item);
};
