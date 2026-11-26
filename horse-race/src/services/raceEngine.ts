import { horseNames } from '@/constants/horseNames'
import { HORSE_COUNT } from '@/constants/race'
import type { Horse } from '@/types/race'
import { generateDistinctColors, randomHorseCondition } from '@/utils/random'

export const generateHorses = (count: number = HORSE_COUNT): Horse[] => {
  if (count > horseNames.length) {
    throw new Error(`Not enough horse names: need ${count}, have ${horseNames.length}`)
  }

  const colors = generateDistinctColors(count)

  return horseNames.slice(0, count).map((name, index) => {
    const color = colors[index]
    if (!color) throw new Error(`Missing color for horse #${index + 1}`)

    return {
      id: index + 1,
      name,
      color,
      condition: randomHorseCondition(),
    }
  })
}
