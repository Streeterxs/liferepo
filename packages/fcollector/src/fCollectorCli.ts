import { collect } from './collect';
import { getAllSlugs } from './getAllSlugs';

export const fCollectorCli = async () => {
  const [_, __, slug, minutes, qty] = process.argv;

  if (!slug) {
    console.log('Slug is required\n');
    console.log('Slugs: \n');

    const allSlugs = getAllSlugs();

    allSlugs.map((slug: string) => console.log(slug));

    return;
  }

  await collect({ slug, minutes: Number(minutes), qty: Number(qty) });
};
