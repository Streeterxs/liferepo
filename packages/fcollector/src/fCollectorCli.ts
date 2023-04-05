import yargs, { ArgumentsCamelCase, CommandModule } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { collect } from './collect';
import { getAllSlugs } from './getAllSlugs';
import { addItem } from './ItemManage/addItem';
import { listItem } from './ItemManage/listItem';
import { removeItem } from './ItemManage/removeItem';

export const fCollectorCli = async () => {
  const [_, __, slug, minutes, qty] = process.argv;

  const allSlugs = getAllSlugs();

  if (!slug) {
    console.log('Slug is required\n');
    console.log('Slugs: \n');

    allSlugs.map((slug: string) => console.log(slug));

    return;
  }

  if (allSlugs.includes(slug)) {
    await collect({ slug, minutes: Number(minutes), qty: Number(qty) });
    return;
  }

  const collectCommand: CommandModule = {
    command: 'collect <slug> <minutes> <qty>',
    describe:
      'Collect new data based on quantity and minutes to any given item',
    handler: (args) => {
      console.log({ args });
      return;
    },
  };

  const addItemCommand: CommandModule = {
    command: 'addItem',
    describe:
      'Collect new data based on quantity and minutes to any given item',
    handler: async (args) => {
      console.log({ args });
      await addItem();
      return;
    },
  };

  const removeItemCommand: CommandModule = {
    command: 'removeItem <slug>',
    describe: 'Remove item based on given slug',
    handler: async ({ slug }: ArgumentsCamelCase<{ slug: string }>) => {
      await removeItem(slug);
      return;
    },
  };

  const listItemCommand: CommandModule = {
    command: 'listItem [slug]',
    describe: 'List all slugs or show item by given slug',
    handler: async ({ slug }: ArgumentsCamelCase<{ slug: string }>) => {
      await listItem(slug);
      return;
    },
  };

  return yargs(hideBin(process.argv))
    .command(collectCommand)
    .command(addItemCommand)
    .command(removeItemCommand)
    .command(listItemCommand)
    .help().argv;
};
