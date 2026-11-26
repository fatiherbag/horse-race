import { describe, expect, it } from 'vitest'
import { generateDistinctColors, randomHorseCondition } from '../random'
import { HORSE_COUNT } from '@/constants/race'

describe('randomHorseCondition', () => {
  it('should return a number between 1 and 100', () => {
    const min = 1
    const max = 100

    const condition = randomHorseCondition()
    expect(condition).toBeGreaterThanOrEqual(min)
    expect(condition).toBeLessThanOrEqual(max)
  })
})

describe('generateDistinctColors', () => {
  it('should generate the HORSE_COUNT distinct colors', () => {
    const colors = generateDistinctColors(HORSE_COUNT)
    expect(colors).toHaveLength(HORSE_COUNT)
  })

  it('should have unique colors', () => {
    const colors = generateDistinctColors(HORSE_COUNT)
    const uniqueColors = new Set(colors)
    expect(uniqueColors.size).toBe(HORSE_COUNT)
  })

  it('should return an empty array if count is 0 or less', () => {
    expect(generateDistinctColors(0)).toEqual([])
    expect(generateDistinctColors(-5)).toEqual([])
  })
})
