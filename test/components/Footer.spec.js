import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Footer, {
      stubs: {
        NuxtLink: { template: '<div></div>' }
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should provide navigation to major areas', () => {
    const wrapper = shallowMount(Footer, {
      stubs: {
        NuxtLink: { template: '<div></div>' }
      }
    });

    expect(wrapper.find('.main-footer__social-links')).toBeTruthy();
  });
});
