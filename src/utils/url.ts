export function getDataUrlFromArr(arr: Uint8ClampedArray, w: number, h: number) {
  if (!w || !h) {
    w = h = Math.sqrt(arr.length/4)
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = w
  canvas.height = h

  const imgData = ctx.createImageData(w, h)
  imgData.data.set(arr)
  ctx.putImageData(imgData, 0, 0)

  return canvas.toDataURL()
}
