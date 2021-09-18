/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import SmallTile from '@/components/SmallTile.vue'

describe('SmallTile component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SmallTile, {
      propsData: {
        contents: [],
        slugName: 'LargePosts'
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display article data', () => {
    const wrapper = shallowMount(SmallTile, {
      propsData: {
        contents: [{
          title: 'My article title',
          description: 'Lorem ipsum'
        }],
        slugName: 'LargePosts'
      },
      stubs: {
        NuxtLink: { template: '<div><slot></slot></div>' }
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
