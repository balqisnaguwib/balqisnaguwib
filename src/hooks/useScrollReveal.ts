import { useEffect } from 'react'

const REVEAL_SELECTOR = '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in'

/**
 * Scroll-triggered reveal system.
 *
 * The reveal classes (.fade-in etc.) start hidden (see index.css, gated behind
 * `html.reveal-ready`) and only animate once they scroll into view. This replaces
 * the previous behaviour where every reveal fired on page load — even for content
 * far below the fold — so animations were finished before the user ever saw them.
 *
 * - Respects `prefers-reduced-motion`: everything is revealed immediately and no
 *   observers are created.
 * - Handles content added after mount (project filters, "load more", tab switches,
 *   modals) via a MutationObserver.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // No JS-driven hiding happened (reduced motion, or old browsers): nothing to do.
    if (prefersReducedMotion || !root.classList.contains('reveal-ready')) {
      root.classList.remove('reveal-ready')
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    const observe = (el: Element) => {
      if (!el.classList.contains('is-visible')) io.observe(el)
    }

    document.querySelectorAll(REVEAL_SELECTOR).forEach(observe)

    // Catch elements mounted after the initial pass.
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(REVEAL_SELECTOR)) observe(node)
          node.querySelectorAll?.(REVEAL_SELECTOR).forEach(observe)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
