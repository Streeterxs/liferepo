import { getItemBySlug } from './getItemBySlug'
import { ItemTime, saveItemTime } from './saveItemTime'

export const collect = async ({
  slug = 'ffxiv_persimmon',
  minutes,
  qty,
}: ItemTime) => {
  const item = getItemBySlug(slug)

  if (!item) {
    console.log(`slug ${slug} do not exists`)
    return
  }

  await saveItemTime({ slug, minutes, qty })
}
