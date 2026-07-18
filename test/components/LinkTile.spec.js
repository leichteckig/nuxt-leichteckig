import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LinkTile from '~/components/LinkTile.vue'

describe('LinkTile component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(LinkTile, {
      props: {
        contents: []
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display a link', async () => {
    const wrapper = await mountSuspended(LinkTile, {
      props: {
        contents: [{
          title: 'My link title',
          img: 'https://ramona.codes',
          tags: [
            'Blog',
            'Jest'
          ]
        }]
      }
    });

    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.find('.post__title').text()).toContain('My link title');
    expect(wrapper.find('.link-tile__tag:nth-of-type(1)').text()).toBe('Blog');
    expect(wrapper.find('.link-tile__tag:nth-of-type(2)').text()).toBe('Jest');
    expect(wrapper.find('.link-tile a').attributes().href).toBe('https://ramona.codes');
  });
});
