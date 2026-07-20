import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Pagination from '~/components/Pagination.vue'

describe('Pagination component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { currentPage: 1, totalPages: 3 }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders a labelled nav with an ordered list of pages', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { currentPage: 1, totalPages: 3 }
    })
    const nav = wrapper.find('nav.pagination')
    expect(nav.exists()).toBe(true)
    expect(nav.attributes('aria-label')).toBeTruthy()
    expect(wrapper.find('ol.pagination__pages').exists()).toBe(true)
    expect(wrapper.findAll('.pagination__page')).toHaveLength(3)
  })

  it('marks only the current page with aria-current', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { currentPage: 2, totalPages: 3 }
    })
    const current = wrapper.findAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0].text()).toBe('2')
    expect(wrapper.find('.pagination__page--current').text()).toBe('2')
  })

  it('disables Previous on the first page and Next on the last', async () => {
    const first = await mountSuspended(Pagination, {
      props: { currentPage: 1, totalPages: 3 }
    })
    // Disabled arrows are non-focusable spans, not links
    expect(first.find('span.pagination__arrow.pagination__btn--disabled').exists()).toBe(true)
    expect(first.find('a.pagination__arrow').exists()).toBe(true)

    const last = await mountSuspended(Pagination, {
      props: { currentPage: 3, totalPages: 3 }
    })
    expect(last.find('span.pagination__arrow.pagination__btn--disabled').exists()).toBe(true)
  })

  it('collapses long ranges with an ellipsis but keeps first and last page', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { currentPage: 5, totalPages: 10 }
    })
    expect(wrapper.find('.pagination__ellipsis').exists()).toBe(true)
    const pageLabels = wrapper.findAll('.pagination__page').map(el => el.text())
    expect(pageLabels).toContain('1')
    expect(pageLabels).toContain('10')
  })

  it('links page one to the clean URL without a page query', async () => {
    const wrapper = await mountSuspended(Pagination, {
      props: { currentPage: 3, totalPages: 3 }
    })
    const pageOne = wrapper.findAll('a.pagination__page').find(el => el.text() === '1')
    expect(pageOne).toBeTruthy()
    expect(pageOne.attributes('href')).not.toContain('page=')
  })
})
