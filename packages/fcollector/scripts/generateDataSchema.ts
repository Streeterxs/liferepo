import { writeFile, readFile } from 'node:fs/promises'
const generateDataSchema = async () => {
  const data = [
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
  ]

  const stringfiedData = JSON.stringify(data)
  await writeFile(`${__dirname}/../data/dataSchema.json`, stringfiedData)
}

;(async () => await generateDataSchema())()
