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
});
