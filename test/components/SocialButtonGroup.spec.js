import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import SocialButtonGroup from '~/components/SocialButtonGroup.vue'

describe('SocialButtonGroup component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SocialButtonGroup);

    expect(wrapper.vm).toBeTruthy();
  });

  it('should link to social media', () => {
    const wrapper = mount(SocialButtonGroup);
    const link = wrapper.find('.button-item a');

    expect(link.attributes('href')).toBe('https://twitter.com/leichteckig');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener');
  });
});
