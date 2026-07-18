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

  it('should trigger link to social media', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const wrapper = mount(SocialButtonGroup);
    const button = wrapper.find('.button-item');

    await button.trigger('click');
    expect(openSpy).toHaveBeenCalledWith('https://twitter.com/leichteckig', '_blank', 'noopener');
  });
});
