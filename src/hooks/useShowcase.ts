import { useState, useEffect } from 'react'

/**
 * Gate for the single GPU showpiece (the liquid-metal hero ring).
 * Returns true only on a wide viewport, with motion allowed, and WebGL
 * available — so phones, low-end devices, and reduced-motion users get the
 * lightweight static fallback instead of a live WebGL render loop.
 *
 * Starts false so the first paint always renders the cheap fallback; the
 * shader is opted into after mount on capable devices.
 */
export function useShowcase(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let webgl = false
    try {
      const canvas = document.createElement('canvas')
      webgl = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      webgl = false
    }

    setEnabled(wide && !reduce && webgl)
  }, [])

  return enabled
}
