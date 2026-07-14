// Isolated so LazyMotion can code-split the (larger) feature bundle out of the
// initial JS and load it dynamically after first paint.
import { domMax } from 'motion/react'

export default domMax
