import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '~/components/Footer.vue'

describe('Footer component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(Footer);
    expect(wrapper.vm).toBeTruthy();
  });

  it('should provide navigation to major areas', async () => {
    const wrapper = await mountSuspended(Footer);

    expect(wrapper.find('.main-footer__social-links').exists()).toBe(true);
    expect(wrapper.find('[data-cy=NavToImprint]').exists()).toBe(true);
    expect(wrapper.find('[data-cy=NavToDP]').exists()).toBe(true);
  });
});
