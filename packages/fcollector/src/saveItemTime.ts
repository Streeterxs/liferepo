import * as yup from 'yup';
import { concatJsonFile } from './concatJsonFile';

export const itemTimeValSchema = yup.object().shape({
  slug: yup.string().required(),
  minutes: yup.number().required().positive().integer(),
  qty: yup.number().positive().integer(),
});
export type ItemTime = {
  slug: string;
  minutes: number;
  qty: number;
};
export const saveItemTime = async (itemTime: ItemTime) => {
  const itemTimePath = `${__dirname}/../data/itemTime.json`;

  try {
    await itemTimeValSchema.validate(itemTime, { strict: true });
  } catch (e) {
    console.log({ error: e });
    throw new Error(e);
  }

  await concatJsonFile(itemTimePath, itemTime);
};
