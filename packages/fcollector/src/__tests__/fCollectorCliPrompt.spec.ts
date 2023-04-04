import { fCollectorCli } from '../fCollectorCli';
import inquirer from 'inquirer';
import { writeFile } from 'node:fs/promises';

const inputObj = {
  name: 'name',
  slug: 'slug_name',
  type: 'game_item',
};

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

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

beforeEach(() => {
  process.argv = [];
  jest.clearAllMocks();
});

it('should call addItem and try to successfully add new item', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => inputObj)
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls[0][1]).toEqual(
    JSON.stringify([{ ...inputObj, values: [keyValuePair] }])
  );
});

it('should call addItem and try to successfully add new item with two keyValuePairs', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };
  const keyValuePair2 = {
    key: 'key2',
    value: 'value2',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => inputObj)
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair2)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls[0][1]).toEqual(
    JSON.stringify([{ ...inputObj, values: [keyValuePair, keyValuePair2] }])
  );
});

it('should avoid update data file if wrong key/value pair is given (key without value)', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => inputObj)
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls.length).toEqual(0);
});

it('should avoid update data file if no slug given (no slug)', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => ({
      name: inputObj.name,
      type: inputObj.type,
    }))
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls.length).toEqual(0);
});

it('should avoid update data file if no type given (no type)', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => ({
      name: inputObj.name,
      slug: inputObj.slug,
    }))
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls.length).toEqual(0);
});

it('should avoid update data file if no name given (no name)', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => ({
      type: inputObj.type,
      slug: inputObj.slug,
    }))
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls.length).toEqual(0);
});

it('should avoid update data file if slug given already exists', async () => {
  process.argv = ['_', '__', 'addItem'];

  const keyValuePair = {
    key: 'key',
    value: 'value',
  };

  (inquirer.prompt as unknown as jest.MockedFunction<() => {}>)
    .mockImplementationOnce(() => ({
      ...inputObj,
      slug: item[0].slug, //already existing slug inside item.json on data folder
    }))
    .mockImplementationOnce(() => ({ toAddKeyValue: true }))
    .mockImplementationOnce(() => keyValuePair)
    .mockImplementationOnce(() => ({ toAddKeyValue: false }));

  await fCollectorCli();

  expect((writeFile as jest.Mock).mock.calls.length).toEqual(0);
});
