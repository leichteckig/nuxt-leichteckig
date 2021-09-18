/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Footer, {
      stubs: {
        NuxtLink: { template: '<div></div>' }
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should provide navigation to major areas', () => {
    const wrapper = shallowMount(Footer, {
      stubs: {
        NuxtLink: { template: '<div></div>' }
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });

    expect(wrapper.find('.main-footer__social-links')).toBeTruthy();
  });
});
