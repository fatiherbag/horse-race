import { describe, expect, it } from 'vitest'
import { generateHorses, generateSchedule } from '../raceEngine'
import { horseNames } from '@/constants/horseNames'
import {
  HORSE_COUNT,
  HORSES_PER_ROUND,
  MAX_CONDITION,
  MIN_CONDITION,
  ROUND_DISTANCES,
} from '@/constants/race'

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

describe('generateSchedule', () => {
  const horses = generateHorses()
  const schedule = generateSchedule(horses)

  it('should generate one round per distance, in order', () => {
    expect(schedule.map((round) => round.distance)).toEqual([...ROUND_DISTANCES])
  })

  it('puts HORSES_PER_ROUND unique, existing horses in each round', () => {
    const validIDs = new Set(horses.map((horse) => horse.id))
    schedule.forEach((round) => {
      expect(round.horseIds).toHaveLength(HORSES_PER_ROUND)
      expect(round.horseIds.every((id) => validIDs.has(id))).toBe(true)
    })
  })
})
