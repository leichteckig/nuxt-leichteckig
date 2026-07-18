import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LargeTile from '~/components/LargeTile.vue'

describe('LargeTile component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(LargeTile, {
      props: {
        contents: [],
        slugName: 'blog'
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
