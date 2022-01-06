/**
 * @jest-environment jsdom
 */

import {mount, shallowMount} from '@vue/test-utils'
import ColorModePicker from '@/components/ColorModePicker.vue'

describe('ColorModePicker component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ColorModePicker, {
      propsData: {
        imagePath: 'test/images/amazing.png'
      },
      mocks: {
        $colorMode: 'unknown'
      },
    });
    wrapper.setData({
      colors: ['system', 'light', 'dark']
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should set other black on click', async () => {
    const mockMethod = jest.spyOn(ColorModePicker.methods, 'getClasses');
    const wrapper = mount(ColorModePicker, {
      mocks: {
        $colorMode: () => {
          return {
            preference: () => {
              return 'black'
            },
            value: () => {
              return 'black'
            },
          }
        },
      },
      stubs: {
        IconSystem: { template: '<div></div>' },
        IconLight: { template: '<div></div>' },
        IconDark: { template: '<div></div>' }
      }
    });
    const button = wrapper.find('.color-item');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });

  it('should set light mode on click', async () => {
    const mockMethod = jest.spyOn(ColorModePicker.methods, 'getClasses');
    const wrapper = mount(ColorModePicker, {
      mocks: {
        $colorMode: () => {
          return {
            preference: () => {
              return 'light'
            },
            value: () => {
              return 'light'
            },
          }
        },
      },
      stubs: {
        IconSystem: { template: '<div></div>' },
        IconLight: { template: '<div></div>' },
        IconDark: { template: '<div></div>' }
      }
    });
    const button = wrapper.find('.color-item');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });

  it('should handle unknown color mode', async () => {
    const mockMethod = jest.spyOn(ColorModePicker.methods, 'getClasses');
    const wrapper = mount(ColorModePicker, {
      mocks: {
        $colorMode: () => {
          return {
            unknown: () => {
              return true;
            }
          }
        },
      },
      stubs: {
        IconSystem: { template: '<div></div>' },
        IconLight: { template: '<div></div>' },
        IconDark: { template: '<div></div>' }
      }
    });
    const button = wrapper.find('.color-item');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });
});
