import { readFile, writeFile } from 'node:fs/promises'
import { ItemTime } from 'src/saveItemTime'

const removeLastItemTime = async () => {
  const path = `${__dirname}/../data/itemTime.json`
  const itemTimeBuffer = await readFile(path)
  const itemTimeString = itemTimeBuffer.toString()
  const itemTime: ItemTime[] = JSON.parse(itemTimeString)

  const newItemTime = itemTime.filter(
    (_, index) => index !== itemTime.length - 1
  )
  const newItemTimeString = JSON.stringify(newItemTime)
  await writeFile(path, newItemTimeString)
}

;(async () => await removeLastItemTime())()
