export interface Horse {
  id: number
  name: string
  color: string
  condition: number
}
export interface Round {
  id: number
  distance: number
  horseIds: number[] //horse ids that will participate in this round
}
export interface RoundResult {
  roundId: number
  rankings: number[] //horse ids in order of their ranking
}
export type RaceStatus = 'idle' | 'ready' | 'running' | 'finished'
