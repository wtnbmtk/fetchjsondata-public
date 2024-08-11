import { cache } from 'react'
export const getCanvas = cache(async (): Promise<Blob | null> => {
  const canvas = document.createElement('canvas').getContext('2d')
  if (canvas == null) {
    return null
  }

  return null
})
