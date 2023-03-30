import { collect } from './collect'

export const fCollectorCli = async () => {
  const [_, __, slug, minutes, qty] = process.argv
  await collect({ slug, minutes: Number(minutes), qty: Number(qty) })
}

;(async () => fCollectorCli())()
