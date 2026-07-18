import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SmallTile from '~/components/SmallTile.vue'

describe('SmallTile component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(SmallTile, {
      props: {
        contents: [],
        slugName: 'blog'
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display article data', async () => {
    const wrapper = await mountSuspended(SmallTile, {
      props: {
        contents: [{
          title: 'My article title',
          description: 'Lorem ipsum',
          slug: 'my-article-title'
        }],
        slugName: 'blog'
      }
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('.post__title').text()).toBe('My article title');
    expect(wrapper.find('.post p').text()).toBe('Lorem ipsum');
  });
});
