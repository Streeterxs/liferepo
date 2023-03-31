import { collect } from '../collect';
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
  readFile: jest.fn(() => new Buffer(JSON.stringify(item))),
}));

jest.mock('../../data/item.json', () => item);

// this test file mocks collect module
jest.mock('../collect', () => ({ collect: jest.fn() }));

beforeEach(() => {
  process.argv = [];
  jest.clearAllMocks();
});

it('should avoid call collect function if slug is not given', async () => {
  process.argv = ['_', '__'];

  await fCollectorCli();

  expect(collect).not.toBeCalled();
});
