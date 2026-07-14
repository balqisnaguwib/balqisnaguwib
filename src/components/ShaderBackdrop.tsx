import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// Full-bleed animated shader-gradient mesh for the hero (ShaderGradient, built on
// three.js + react-three-fiber). Dark near-black base with electric cyan/violet
// flows. Lazy-loaded and desktop/motion-gated (see useShowcase); a static CSS
// gradient is the fallback everywhere else.
const ShaderBackdrop = () => (
  <ShaderGradientCanvas
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    pixelDensity={1}
    fov={40}
  >
    <ShaderGradient
      control="props"
      type="waterPlane"
      animate="on"
      uSpeed={0.2}
      uStrength={1.6}
      uDensity={1.4}
      uFrequency={5.5}
      uAmplitude={0}
      color1="#060913"
      color2="#22d3ee"
      color3="#7c5cff"
      reflection={0.12}
      cAzimuthAngle={180}
      cPolarAngle={80}
      cDistance={2.9}
      cameraZoom={9.2}
      rotationX={50}
      positionX={0}
      lightType="3d"
      brightness={1.05}
      envPreset="city"
      grain="on"
    />
  </ShaderGradientCanvas>
)

export default ShaderBackdrop
