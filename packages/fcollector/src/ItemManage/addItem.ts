import { getAllSlugs } from '../getAllSlugs';

const keyValueQuestions = [
  {
    type: 'input',
    name: 'key',
    message: 'Add the custom property key: ',
  },

  {
    type: 'input',
    name: 'value',
    message: 'Add the custom property value: ',
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
  {
    type: 'input',
    name: 'values',
    message: 'How many key/value do you need?',
    validate(value: string) {
      const valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
  },
];

export const addItem = async () => {
  // esm package
  const inquirer = (await import('inquirer')).default;

  const answers = await inquirer.prompt(questions);
  console.log({ answers });
};
