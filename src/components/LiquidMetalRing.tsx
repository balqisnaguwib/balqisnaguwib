import { LiquidMetal } from '@paper-design/shaders-react'

// The Phase 3 showpiece: a live liquid-metal shader (Paper Shaders, plain WebGL —
// no three.js) rendered as the ring behind the hero photo. Lazy-loaded and only
// mounted on capable devices (see useShowcase); the static gradient ring is the
// fallback everywhere else.
const LiquidMetalRing = () => (
  <div className="liquid-ring" aria-hidden="true">
    <LiquidMetal
      style={{ width: '100%', height: '100%' }}
      colorBack="#00000000"
      colorTint="#1f6feb"
      shape="circle"
      repetition={4}
      softness={0.4}
      shiftRed={0.3}
      shiftBlue={0.3}
      distortion={0.2}
      contour={1}
      angle={45}
      speed={0.7}
      scale={1}
    />
  </div>
)

export default LiquidMetalRing
