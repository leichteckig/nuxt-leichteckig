import { shallowMount } from '@vue/test-utils'
import LargeTile from '@/components/LargeTile.vue'

describe('LargeTile component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(LargeTile, {
      propsData: {
        contents: [],
        slugName: 'LargePosts'
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
