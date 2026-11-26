import { describe, expect, it } from 'vitest'
import { generateDistinctColors, randomInt } from '../random'
import { HORSE_COUNT } from '@/constants/race'

describe('randomInt', () => {
  it('should return a number between 1 and 100', () => {
    const min = 1
    const max = 100

    const condition = randomInt(min, max)
    expect(condition).toBeGreaterThanOrEqual(min)
    expect(condition).toBeLessThanOrEqual(max)
  })

  it('should return same number when min max is same', () => {
    const min = 5
    const max = 5
    const result = randomInt(min, max)
    expect(result).toBe(min)
  })

  it('should return an integer between min and max in 1000 iterations', () => {
    const min = 1
    const max = 10
    for (let i = 0; i < 1000; i++) {
      const result = randomInt(min, max)
      expect(result).toBeGreaterThanOrEqual(min)
      expect(result).toBeLessThanOrEqual(max)
      expect(Number.isInteger(result)).toBe(true)
    }
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
