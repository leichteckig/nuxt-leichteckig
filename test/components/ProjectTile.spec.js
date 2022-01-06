/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import ProjectTile from '@/components/ProjectTile.vue'

describe('ProjectTile component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(ProjectTile, {
      propsData: {
        contents: [],
        title: 'LargePosts'
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display github data', () => {
    const wrapper = shallowMount(ProjectTile, {
      propsData: {
        contents: [{
          full_name: 'leichteckig/my-project',
          description: 'Lorem ipsum',
          html_url: 'https://github.com/leichteckig'
        }],
        title: 'Github thingy'
      },
      stubs: {
        NuxtLink: { template: '<div><slot></slot></div>' }
      }
    });

    expect(wrapper.find('h2').text()).toBe('Github thingy');
    expect(wrapper.find('.project__title').text()).toBe('leichteckig/my-project');
    expect(wrapper.find('.project__link-tile p').text()).toBe('Lorem ipsum');
    expect(wrapper.find('.project-tile__listing a').attributes().href).toBe('https://github.com/leichteckig');
  });
});
