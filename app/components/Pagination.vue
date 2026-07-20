<template>
  <nav
    class="pagination"
    :aria-label="$t('paginationLabel')"
    data-cy="Pagination"
  >
    <!-- Previous. `custom` lets us render the anchor ourselves: vue-router's
         active matching ignores the query string, so a plain NuxtLink would
         wrongly mark every same-path page link as aria-current="page". -->
    <NuxtLink
      v-if="currentPage > 1"
      v-slot="{ href, navigate }"
      :to="pageLink(currentPage - 1)"
      custom
    >
      <a
        :href="href"
        class="pagination__btn pagination__arrow handdraw-border"
        rel="prev"
        :aria-label="$t('paginationPrevious')"
        @click="navigate"
      >
        <span aria-hidden="true">‹</span>
        <span class="pagination__arrow-text">{{ $t('paginationPrevious') }}</span>
      </a>
    </NuxtLink>
    <span
      v-else
      class="pagination__btn pagination__arrow pagination__btn--disabled handdraw-border"
      aria-hidden="true"
    >
      <span aria-hidden="true">‹</span>
      <span class="pagination__arrow-text">{{ $t('paginationPrevious') }}</span>
    </span>

    <!-- Desktop: numbered pages -->
    <ol class="pagination__pages">
      <li
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
        class="pagination__item"
      >
        <span
          v-if="item === ELLIPSIS"
          class="pagination__ellipsis"
          aria-hidden="true"
        >…</span>
        <span
          v-else-if="item === currentPage"
          class="pagination__btn pagination__page pagination__page--current handdraw-border"
          aria-current="page"
          :aria-label="$t('paginationCurrentPage', { page: item })"
        >{{ item }}</span>
        <NuxtLink
          v-else
          v-slot="{ href, navigate }"
          :to="pageLink(item)"
          custom
        >
          <a
            :href="href"
            class="pagination__btn pagination__page handdraw-border"
            :aria-label="$t('paginationGoToPage', { page: item })"
            @click="navigate"
          >{{ item }}</a>
        </NuxtLink>
      </li>
    </ol>

    <!-- Mobile: compact status between the arrows -->
    <span class="pagination__status">
      {{ $t('paginationStatus', { page: currentPage, total: totalPages }) }}
    </span>

    <!-- Next -->
    <NuxtLink
      v-if="currentPage < totalPages"
      v-slot="{ href, navigate }"
      :to="pageLink(currentPage + 1)"
      custom
    >
      <a
        :href="href"
        class="pagination__btn pagination__arrow handdraw-border"
        rel="next"
        :aria-label="$t('paginationNext')"
        @click="navigate"
      >
        <span class="pagination__arrow-text">{{ $t('paginationNext') }}</span>
        <span aria-hidden="true">›</span>
      </a>
    </NuxtLink>
    <span
      v-else
      class="pagination__btn pagination__arrow pagination__btn--disabled handdraw-border"
      aria-hidden="true"
    >
      <span class="pagination__arrow-text">{{ $t('paginationNext') }}</span>
      <span aria-hidden="true">›</span>
    </span>
  </nav>
</template>

<script setup>
const ELLIPSIS = '…'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

// Windowed page list: always show first and last page, plus the current page
// and its immediate neighbours, collapsing the rest into ellipses.
const items = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  const result = [1]

  if (left > 2) {
    result.push(ELLIPSIS)
  }
  for (let page = left; page <= right; page++) {
    result.push(page)
  }
  if (right < total - 1) {
    result.push(ELLIPSIS)
  }
  result.push(total)

  return result
})

// Page 1 keeps the clean, canonical URL (no query); other pages carry ?page=N.
const pageLink = page => (page <= 1 ? { query: {} } : { query: { page: String(page) } })
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 40px 0 20px;
}

.pagination__pages {
  display: none;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination__item {
  display: flex;
}

.pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* Comfortable, WCAG-sized tap targets */
  min-width: 44px;
  min-height: 44px;
  padding: 0 14px;
  color: var(--color);
  font-size: 18px;
  text-decoration: none;
  background: var(--bg);
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}

.pagination__page {
  padding: 0 10px;
}

/* Links react to hover/focus; the current page and disabled arrows do not. */
a.pagination__btn:hover,
a.pagination__btn:focus-visible {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Explicit, high-contrast keyboard focus indicator (WCAG 2.4.7) */
a.pagination__btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.pagination__page--current {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--bg);
  cursor: default;
}

.pagination__btn--disabled {
  opacity: 0.4;
  cursor: default;
}

.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 44px;
  color: var(--color-text-muted);
}

.pagination__status {
  font-family: var(--font-family-secondary);
  font-size: 26px;
  color: var(--color);
  padding: 0 6px;
}

/* Desktop: numbered pages replace the compact status, and the arrows regain
   their text labels. */
@media (min-width: 800px) {
  .pagination__pages {
    display: flex;
  }

  .pagination__status {
    display: none;
  }
}

/* Mobile: arrows shrink to just the chevron to keep the row compact. */
@media (max-width: 799px) {
  .pagination__arrow-text {
    display: none;
  }
}
</style>
