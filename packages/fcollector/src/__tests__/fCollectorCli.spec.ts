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

it('should call write file to write new itemTime correctly', async () => {
  const slug = 'ffxiv_persimmon';
  const minutes = '10';
  const qty = '50';
  process.argv = ['_', '__', slug, minutes, qty];

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls).toHaveLength(1);

  const itemTime = {
    slug,
    minutes: Number(minutes),
    qty: Number(qty),
  };
  expect((writeFile as jest.Mock).mock.calls[0][1]).toEqual(
    JSON.stringify([itemTime])
  );
});

it('should avoid call write file to writeFile if minutes is not a number and generate a error', async () => {
  process.argv = ['_', '__', 'ffxiv_persimmon', 'test', '10'];

  try {
    await fCollectorCli();
  } catch (error) {
    expect(error.message).toEqual(
      'ValidationError: minutes must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).'
    );
  }

  expect(writeFile).not.toBeCalled();
});

it('should avoid call write file to writeFile if quantity is not a number and generate a error', async () => {
  process.argv = ['_', '__', 'ffxiv_persimmon', '10', 'test'];

  try {
    await fCollectorCli();
  } catch (error) {
    expect(error.message).toEqual(
      'ValidationError: qty must be a `number` type, but the final value was: `NaN` (cast from the value `NaN`).'
    );
  }

  expect(writeFile).not.toBeCalled();
});
