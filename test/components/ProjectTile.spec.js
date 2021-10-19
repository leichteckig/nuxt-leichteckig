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
          description: 'Lorem ipsum'
        }],
        title: 'LargePosts'
      },
      stubs: {
        NuxtLink: { template: '<div><slot></slot></div>' }
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
