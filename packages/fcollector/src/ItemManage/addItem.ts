import { concatJsonFile } from '../concatJsonFile';
import { getAllSlugs } from '../getAllSlugs';
import * as yup from 'yup';

const toAddKeyValueQuestions = [
  {
    type: 'confirm',
    name: 'toAddKeyValue',
    message: 'Add more key/value to item?',
    default: true,
  },
];

const keyValueQuestions = [
  {
    type: 'input',
    name: 'key',
    message: 'Add the custom property (key): ',
  },

  {
    type: 'input',
    name: 'value',
    message: 'Add the custom property (value): ',
  },
];

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the item?',
  },
  {
    type: 'input',
    name: 'slug',
    message: 'Add a unique slug: ',
    validate(value: string) {
      const slugs = getAllSlugs();

      if (!value) {
        return 'Please enter a unique slug';
      }

      return !slugs.includes(value) || 'Please enter a unique slug';
    },
  },
  {
    type: 'input',
    name: 'type',
    message: 'Add a item type:',
  },
];

export const itemTimeValSchema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  type: yup.string().required(),
  values: yup.array().of(
    yup.object().shape({
      key: yup.string().required(),
      value: yup.mixed().required(),
    })
  ),
});

export const addItem = async () => {
  const path = `${__dirname}/../data/item.json`;
  // esm package
  const inquirer = (await import('inquirer')).default;

  const { name, slug, type } = await inquirer.prompt(questions);

  let valuesArray: { key: string; value: string }[] = [];
  let isToAddKeyValue = true;
  while (isToAddKeyValue) {
    const { toAddKeyValue } = await inquirer.prompt(toAddKeyValueQuestions);
    isToAddKeyValue = toAddKeyValue;

    if (!isToAddKeyValue) {
      break;
    }

    const { key, value } = await inquirer.prompt(keyValueQuestions);
    valuesArray = [...valuesArray, { key, value }];
  }

  const itemObj = {
    name,
    slug,
    type,
    values: valuesArray,
  };

  await itemTimeValSchema.validate(itemObj);

  await concatJsonFile(path, itemObj);
};
