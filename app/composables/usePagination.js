/**
 * Client-friendly pagination for a list that is fully loaded up front.
 *
 * The page lives in the URL (`?page=N`) so it survives reloads, sharing, and
 * the back button; anything invalid or out of range falls back to page 1.
 * On a page change the reader is sent back to the top of the list and focus is
 * moved there (the number they clicked becomes a non-focusable "current"
 * marker) — respecting `prefers-reduced-motion`.
 *
 * Attach the returned behaviour by adding `ref="listing" tabindex="-1"` to the
 * list's container element (usually the page's <main>).
 *
 * @param {import('vue').MaybeRefOrGetter<Array>} items - the full, ordered list
 * @param {number} pageSize - items shown per page
 */
export function usePagination(items, pageSize) {
  const route = useRoute()

  const totalPages = computed(() =>
    Math.max(1, Math.ceil((toValue(items)?.length ?? 0) / pageSize))
  )

  const currentPage = computed(() => {
    const requested = Number.parseInt(route.query.page, 10)
    if (!Number.isFinite(requested) || requested < 1) {
      return 1
    }
    return Math.min(requested, totalPages.value)
  })

  const pagedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return (toValue(items) ?? []).slice(start, start + pageSize)
  })

  const listing = useTemplateRef('listing')
  watch(currentPage, () => {
    if (!import.meta.client) {
      return
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    listing.value?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  })

  return { currentPage, totalPages, pagedItems, listing }
}
