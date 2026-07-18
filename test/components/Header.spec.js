import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import Header from '~/components/Header.vue'

const { useRouteMock } = vi.hoisted(() => {
  return {
    useRouteMock: vi.fn()
  }
})

mockNuxtImport('useRoute', () => useRouteMock)

describe('Header component', () => {
  beforeEach(() => {
    useRouteMock.mockReturnValue({
      fullPath: 'full/path',
      name: 'index'
    });
  });

  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(Header);
    expect(wrapper.vm).toBeTruthy();
  });

  it('should provide navigation to major areas', async () => {
    const wrapper = await mountSuspended(Header);

    expect(wrapper.find('.color-mode__button-group').exists()).toBe(true);
    expect(wrapper.find('.first__link').attributes().href).toBe('/');
    expect(wrapper.find('.second__link').attributes().href).toContain('/about');
    expect(wrapper.find('[data-cy=Writing]').attributes().href).toContain('/blog');
    expect(wrapper.find('[data-cy=Speaking]').attributes().href).toContain('/talks');
    expect(wrapper.find('[data-cy=Attending]').attributes().href).toContain('/conferences');
  });

  it('should open navigation points', async () => {
    const wrapper = await mountSuspended(Header);
    const hamburger = wrapper.find('.header-main__hamburger');
    const navLinks = wrapper.find('.header-main__nav-links');

    expect(navLinks.classes()).not.toContain('is--active');
    await hamburger.trigger('click');
    expect(navLinks.classes()).toContain('is--active');

    // clicking a navigation link closes the menu again
    await wrapper.find('[data-cy=About]').trigger('click');
    expect(navLinks.classes()).not.toContain('is--active');
  });

  it('should hide language picker on detail pages', async () => {
    useRouteMock.mockReturnValue({
      fullPath: 'full/path/slug',
      name: 'blog-slug'
    });
    const wrapper = await mountSuspended(Header);

    expect(wrapper.find('.locale-mode__button-group').exists()).toBe(false);
  });
});
