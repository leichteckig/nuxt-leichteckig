import { shallowMount } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'

describe('Hero component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        img: {
          path: 'test/images/amazing.png',
          alt: 'moe'
        }
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should render image path', () => {
    const wrapper = shallowMount(Hero, {
      propsData: {
        img: {
          path: 'test/images/amazing.png',
          alt: 'moe'
        }
      }
    });

    expect(wrapper.find('.hero-image').attributes().src).toBe('/test/images/amazing.png');
  });
});

