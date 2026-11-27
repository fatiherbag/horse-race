import { createPinia, setActivePinia } from 'pinia'
import { it, describe, beforeEach, expect } from 'vitest'
import { useHorsesStore } from '../horses'
import { HORSE_COUNT } from '@/constants/race'

describe('horses store', () => {
  //create new pinia before each test. So each test has own state.
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts empyt', () => {
    const store = useHorsesStore()
    expect(store.horses).toEqual([])
    expect(store.hasHorses).toBe(false)
  })

  it('should generate HORSE_COUNT  horses', () => {
    const store = useHorsesStore()
    store.generate()
    expect(store.horses).toHaveLength(HORSE_COUNT)
    expect(store.hasHorses).toBe(true)
  })

  it('should find horse by id', () => {
    const store = useHorsesStore()
    store.generate()
    const firstHorse = store.horses[0]!
    expect(store.getHorse(firstHorse?.id)).toEqual(firstHorse)
    expect(store.getHorse(999)).toBeUndefined()
  })
})
