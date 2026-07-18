import { describe, it, expect, vi, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MediaGrid from '~/components/content/MediaGrid.vue'

describe('MediaGrid component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(MediaGrid, {
      props: {
        media: [{
          name: 'SCD\'21',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should render slide links', async () => {
    const wrapper = await mountSuspended(MediaGrid, {
      props: {
        media: [{
          name: 'Slides',
          url: 'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt'
        }]
      }
    });
    const button = wrapper.find('[data-cy=OpenSlides]');

    expect(button.text()).toContain('Slides');
  });

  it('should have link to slides', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {});
    const wrapper = await mountSuspended(MediaGrid, {
      props: {
        media: [{
          name: 'Slides',
          url: 'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt'
        }]
      }
    });
    const button = wrapper.find('[data-cy=OpenSlides]');

    await button.trigger('click');
    expect(openSpy).toHaveBeenCalledWith(
      'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt',
      '_blank'
    );
    expect(wrapper.emitted('open')).toBeTruthy();
  });

  it('should render youtube video', async () => {
    const wrapper = await mountSuspended(MediaGrid, {
      props: {
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
