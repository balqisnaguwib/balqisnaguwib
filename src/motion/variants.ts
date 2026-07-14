import type { Variants, Transition } from 'motion/react'

// Shared motion vocabulary so entrances/hovers feel like one system.
// Every component respects prefers-reduced-motion via `useReducedMotion`
// (see each usage); these variants are the "motion allowed" path.

const easeOut = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

// Parent that reveals its children in sequence.
export const staggerContainer = (stagger = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

// Standard viewport trigger: animate once, a little before fully in view.
export const inViewOnce = { once: true, margin: '0px 0px -12% 0px' } as const

export const springHover: Transition = { type: 'spring', stiffness: 320, damping: 24 }

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: springHover },
} satisfies Variants
