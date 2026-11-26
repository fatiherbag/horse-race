import { describe, expect, it } from 'vitest'
import { generateHorses } from '../raceEngine'
import { horseNames } from '@/constants/horseNames'
import { HORSE_COUNT, MAX_CONDITION, MIN_CONDITION } from '@/constants/race'

const HSL_REGEX = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/

describe('generateHorses', () => {
  it('should generate the correct number of horses with colors and conditions', () => {
    const horses = generateHorses()
    expect(horses).toHaveLength(HORSE_COUNT)

    horses.forEach((horse, index) => {
      expect(horse.id).toBe(index + 1)
      expect(horse.name).toBe(horseNames[index])
      expect(horse.color).toMatch(HSL_REGEX)
      expect(horse.condition).toBeGreaterThanOrEqual(MIN_CONDITION)
      expect(horse.condition).toBeLessThanOrEqual(MAX_CONDITION)
    })
  })

  it('should throw an error if count exceeds available horse names', () => {
    const excessiveCount = horseNames.length + 1
    expect(() => generateHorses(excessiveCount)).toThrowError(
      `Not enough horse names: need ${excessiveCount}, have ${horseNames.length}`,
    )
  })

  it('should have unique horse names and colors', () => {
    const horses = generateHorses()
    const names = horses.map((horse) => horse.name)
    const colors = horses.map((horse) => horse.color)

    const uniqueNames = new Set(names)
    const uniqueColors = new Set(colors)

    expect(uniqueNames.size).toBe(horses.length)
    expect(uniqueColors.size).toBe(horses.length)
  })

  it('returns exactly the requested number of horses', () => {
    expect(generateHorses(5)).toHaveLength(5)
  })
})
