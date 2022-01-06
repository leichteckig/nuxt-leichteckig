/**
 * @jest-environment jsdom
 */

import { mount, shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Header, {
      stubs: {
        NuxtLink: { template: '<div></div>' },
        ColorModePicker: { template: '<div></div>' },
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should provide navigation to major areas', () => {
    const wrapper = shallowMount(Header, {
      stubs: {
        NuxtLink: { template: '<div></div>' }
      }
    });

    expect(wrapper.find('.color-mode__container')).toBeTruthy();
    expect(wrapper.find('.first__link').attributes().to).toBe('/');
    expect(wrapper.find('.second__link').attributes().to).toBe('/about/');
    expect(wrapper.find('.header-main__link:nth-of-type(3)').attributes().to).toBe('/blog/');
    expect(wrapper.find('.header-main__link:nth-of-type(4)').attributes().to).toBe('/talks/');
    expect(wrapper.find('.header-main__link:nth-of-type(5)').attributes().to).toBe('/conferences/');
  });

  it('should open navigation points', async () => {
    const mockMethod = jest.spyOn(Header.methods, 'toggleMobileMenu');
    const wrapper = mount(Header, {
      propsData: {
        media: [{
          name: 'Slides',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      },
      stubs: {
        NuxtLink: { template: '<div></div>' },
        ColorModePicker: { template: '<div></div>' },
      }
    });
    const button = wrapper.find('[data-cy=About]');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });
});
