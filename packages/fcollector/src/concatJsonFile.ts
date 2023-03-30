import { writeFile, readFile } from 'node:fs/promises'

export const concatJsonFile = async (path, data) => {
  const dataBuffer = await readFile(path)
  const dataString = dataBuffer.toString()
  const dataJson = JSON.parse(dataString)

  const newDataJson = [...dataJson, data]
  const newDataJsonString = JSON.stringify(newDataJson)

  await writeFile(path, newDataJsonString)
}
