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
    const links = wrapper.findAll('.button-item a');
    const hrefs = links.map(link => link.attributes('href'));

    // Order matters: it drives the visual row of icons
    expect(hrefs).toEqual([
      'https://github.com/leichteckig',
      'https://www.linkedin.com/in/ramona-schwering/',
      'https://bsky.app/profile/leichteckig.bsky.social',
      'https://twitter.com/leichteckig',
      '/rss.xml'
    ]);

    const firstLink = links[0];
    expect(firstLink.attributes('target')).toBe('_blank');
    expect(firstLink.attributes('rel')).toBe('noopener');
  });
});
