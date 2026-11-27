import { generateHorses } from '@/services/raceEngine'
import type { Horse } from '@/types/race'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useHorsesStore = defineStore('horses', () => {
  //state
  const horses = ref<Horse[]>([])

  //getters
  const horsesById = computed(() => new Map(horses.value.map((horse) => [horse.id, horse])))

  const hasHorses = computed(() => horses.value.length > 0)

  //actions

  function generate(count?: number) {
    horses.value = generateHorses(count)
  }

  function getHorse(id: number): Horse | undefined {
    return horsesById.value.get(id)
  }

  return { horses, horsesById, hasHorses, generate, getHorse }
})
