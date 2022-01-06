/**
 * @jest-environment jsdom
 */

import { mount, shallowMount } from '@vue/test-utils'
import MediaGrid from '@/components/MediaGrid.vue'
import Button from '@/components/Button.vue'

describe('MediaGrid component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(MediaGrid, {
      propsData: {
        media: [{
          name: 'SCD\'21',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should render slide links',  () => {
    const wrapper = shallowMount(MediaGrid, {
      propsData: {
        media: [{
          name: 'Slides',
          url: 'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt'
        }]
      },
      stubs: {
        Button: Button
      },
    });
    const button = wrapper.find('[data-cy=OpenSlides]');

    expect(button.text()).toContain('Slides');
  });

  it('should have link to slides', async () => {
    const mockMethod = jest.spyOn(MediaGrid.methods, 'openSlideLink');
    global.open = jest.fn();
    const wrapper = mount(MediaGrid, {
      propsData: {
        media: [{
          name: 'Slides',
          url: 'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt'
        }]
      },
      stubs: {
        Button: Button
      }
    });
    const button = wrapper.find('[data-cy=OpenSlides]');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });

  it('should render youtube video', () => {
    const wrapper = shallowMount(MediaGrid, {
      propsData: {
        media: [{
          name: 'SCD\'21',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      }
    });

    expect(wrapper.find('.media-grid h3').text()).toBe('SCD\'21');
    expect(wrapper.find('.media-grid iframe').attributes().src)
      .toBe('https://www.youtube.com/embed/sxvQoWF4KS0');
  });
});
