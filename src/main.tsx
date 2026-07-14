import React from 'react'
import ReactDOM from 'react-dom/client'
import { LazyMotion } from 'motion/react'
import motionFeatures from './motion/features'
import App from './App.tsx'
import './index.css'

// Features are loaded eagerly (not code-split): above-the-fold content uses
// entrance variants, and lazy-loading them caused a brief blank-hero flash
// before the feature chunk arrived. `strict` still enforces the tree-shakeable
// `m.*` components over `motion.*`.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LazyMotion features={motionFeatures} strict>
      <App />
    </LazyMotion>
  </React.StrictMode>,
)
