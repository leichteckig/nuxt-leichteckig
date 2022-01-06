/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import LinkTile from '@/components/LinkTile.vue'

describe('LinkTile component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(LinkTile, {
      propsData: {
        contents: [],
        slugName: 'LargePosts'
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display a link', () => {
    const wrapper = shallowMount(LinkTile, {
      propsData: {
        contents: [{
          title: 'My link title',
          img: 'https://ramona.codes',
          tags: [
            'Blog',
            'Jest'
          ]
        }],
        slugName: 'LargePosts'
      }
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('.post__title').text()).toBe('My link title');
    expect(wrapper.find('.link-tile__tag:nth-of-type(1)').text()).toBe('Blog');
    expect(wrapper.find('.link-tile__tag:nth-of-type(2)').text()).toBe('Jest');
    expect(wrapper.find('.link-tile a').attributes().href).toBe('https://ramona.codes');
  });
});
