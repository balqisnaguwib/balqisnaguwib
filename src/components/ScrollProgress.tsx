import { m, useScroll, useSpring } from 'motion/react'

// Thin gradient bar at the very top that tracks reading progress.
// Driven by scroll position (not autonomous motion), so it's fine under
// reduced-motion; the spring just smooths it.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export default ScrollProgress
