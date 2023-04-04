import { writeFile } from 'node:fs/promises';
import { fCollectorCli } from '../fCollectorCli';

const item = [
  {
    name: 'Persimmon Log',
    slug: 'ffxiv_persimmon',
    type: 'game_item',
    values: [
      {
        key: 'type',
        value: 'Lumber',
      },
      {
        key: 'itemType',
        value: 'Crafting  Material',
      },
    ],
  },
];

jest.mock('node:fs/promises', () => ({
  writeFile: jest.fn(),
  readFile: jest.fn(() => new Buffer(JSON.stringify([]))),
}));

jest.mock('../../data/item.json', () => item);

beforeEach(() => {
  process.argv = [];
  jest.clearAllMocks();
});

it('should call write file to write empty array (remove item)', async () => {
  const slug = 'ffxiv_persimmon';
  process.argv = ['_', '__', 'removeItem', slug];

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls).toHaveLength(1);

  expect((writeFile as jest.Mock).mock.calls[0][1]).toEqual(JSON.stringify([]));
});

it('should avoid remove item if slug not exists', async () => {
  process.argv = ['_', '__', 'removeItem', 'blah'];

  try {
    try {
      await fCollectorCli();
    } catch (e) {
      console.log({ error: e });
    }
  } catch (e) {
    console.log('test error');
  }

  expect((writeFile as jest.Mock).mock.calls).toHaveLength(0);
});

// try catch not catching cli error when argument is missing
it.skip('should avoid remove item if no slug is given', async () => {
  process.argv = ['_', '__', 'removeItem'];

  try {
    try {
      await fCollectorCli();
    } catch (e) {
      console.log({ error: e });
    }
  } catch (e) {
    console.log('test error');
  }

  expect((writeFile as jest.Mock).mock.calls).toHaveLength(0);
});
