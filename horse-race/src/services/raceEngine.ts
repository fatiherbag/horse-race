import { horseNames } from '@/constants/horseNames'
import {
  HORSE_COUNT,
  HORSES_PER_ROUND,
  MAX_CONDITION,
  MIN_CONDITION,
  ROUND_DISTANCES,
} from '@/constants/race'
import type { Horse, Round } from '@/types/race'
import { generateDistinctColors, randomInt, shuffleArray } from '@/utils/random'

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
      condition: randomInt(MIN_CONDITION, MAX_CONDITION),
    }
  })
}

export const generateSchedule = (horses: Horse[]): Round[] => {
  return ROUND_DISTANCES.map((distance, index) => {
    return {
      id: index + 1,
      distance,
      horseIds: shuffleArray(horses)
        .slice(0, HORSES_PER_ROUND)
        .map((horse) => horse.id),
    }
  })
}
