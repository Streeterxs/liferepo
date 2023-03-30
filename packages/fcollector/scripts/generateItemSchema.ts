import { writeFile, readFile } from 'node:fs/promises'
const generateItemSchema = async () => {
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
  ]

  const stringfiedItem = JSON.stringify(item)
  await writeFile(`${__dirname}/../item/item.json`, stringfiedItem)
}

;(async () => await generateItemSchema())()
