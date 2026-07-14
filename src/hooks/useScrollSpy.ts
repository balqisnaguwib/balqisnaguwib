import { useState, useEffect } from 'react'

/**
 * Returns the id of the section currently near the vertical center of the
 * viewport, for nav "scroll-spy" active-link highlighting.
 *
 * Uses an IntersectionObserver with a center band, plus a MutationObserver so
 * it picks up the below-the-fold sections that mount lazily (React.lazy).
 */
export function useScrollSpy(ids: string[]): string {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      // Fire when a section crosses the middle of the viewport.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    const observed = new Set<Element>()
    const scan = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && !observed.has(el)) {
          observer.observe(el)
          observed.add(el)
        }
      })
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [ids.join(',')])

  return activeId
}
