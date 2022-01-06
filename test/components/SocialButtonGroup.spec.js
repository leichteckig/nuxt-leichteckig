/**
 * @jest-environment jsdom
 */

import {mount, shallowMount} from '@vue/test-utils'
import SocialButtonGroup from '@/components/SocialButtonGroup.vue'

describe('ColorModePicker component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SocialButtonGroup);

    expect(wrapper.vm).toBeTruthy();
  });

  it('should trigger link to social media', async () => {
    const mockMethod = jest.spyOn(SocialButtonGroup.methods, 'openSocialLink');
    global.open = jest.fn();
    const wrapper = mount(SocialButtonGroup, {
      propsData: {
        media: [{
          name: 'Slides',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      },
      stubs: {
        IconXing: { template: '<div></div>' },
        IconTwitter: { template: '<div></div>' },
        IconLinkedin: { template: '<div></div>' },
        IconGithub: { template: '<div></div>' }
      }
    });
    const button = wrapper.find('.button-item');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });
});
