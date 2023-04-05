import { spawn } from 'child_process';
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

jest.mock('../../data/item.json', () => item);

beforeEach(() => {
  process.argv = [];
  jest.clearAllMocks();
});

it('should list all slugs if listItem is given without slug', async () => {
  const consoleLog = jest.spyOn(console, 'log');

  process.argv = ['_', '__', 'listItem'];

  await fCollectorCli();

  expect(consoleLog.mock.calls.length).toEqual(2);
  expect(consoleLog.mock.calls[0][0]).toEqual('All slugs: ');
});

it('should list detailed item if slug is given', async () => {
  const consoleLog = jest.spyOn(console, 'log');

  process.argv = ['_', '__', 'listItem', item[0].slug];

  await fCollectorCli();

  expect(consoleLog.mock.calls.length).toEqual(2);
  expect(consoleLog.mock.calls[0][0]).toEqual('Item found by slug: ');
});

it('should list return warning if given slug do not exists in data stored', async () => {
  const consoleLog = jest.spyOn(console, 'log');

  process.argv = ['_', '__', 'listItem', 'blah'];

  await fCollectorCli();

  expect(consoleLog.mock.calls.length).toEqual(1);
  expect(consoleLog.mock.calls[0][0]).toEqual(
    'Given slug do not exists in local data storage'
  );
});
