type HslColor = `hsl(${number}, ${number}%, ${number}%)`

interface DistinctColorOptions {
  saturation?: number
  lightness?: number
  startHue?: number
}

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateDistinctColors = (
  count: number,
  options: DistinctColorOptions = {},
): HslColor[] => {
  const { saturation = 70, lightness = 55, startHue = Math.floor(Math.random() * 360) } = options

  if (count <= 0) return []

  const colors: HslColor[] = []

  for (let i = 0; i < count; i++) {
    const hue = Math.round((startHue + (i * 360) / count) % 360)
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }

  return colors
}
