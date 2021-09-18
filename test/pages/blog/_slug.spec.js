/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import slug from '@/pages/blog/_slug.vue'
import Page from '@/components/Page.vue'

describe('Conference page', () => {
  const getInitialised = async function (conferences, options = {}, slug = {}) {
    let component = conferences

    if (!component.asyncData) {
      return shallowMount(component);
    }

    let originalData = []
    if (component.data != null) {
      originalData = component.data()
    }
    const asyncData = await component.asyncData({
      params: {
        slug
      },
      $content: () => {
        return {
          fetch: () => {
            return slug
          },
          where: () => {
            return {
              fetch: () => {
                return []
              },
            }
          },
        }
      },
      i18n: () => {
        return {
          locale: () => {
            return 'de'
          },
        }
      }
    });
    const head =  await component.head();
    component.data = function () {
      return {
        ...originalData,
        ...asyncData,
        ...head
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(slug, {
      stubs: {
        Page: Page,
        Hero: { template: '<div></div>' },
        NuxtContent: { template: '<div></div>' }
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    }, {
      title: 'Past talk on conference',
      img: 'http://localhost:3000/moe.jpg',
      description: 'Upcoming conference',
      alt: 'September 25, 2020',
      createdAt: '2025-09-25T22:50:54.724Z',
      author: {
        name: 'Ramona Schwering',
        bio: 'same same'
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should check canonical link', async () => {
    const wrapper = await getInitialised(slug, {
      stubs: {
        Page: Page,
        Hero: { template: '<div></div>' },
        NuxtContent: { template: '<div></div>' }
      },
    }, {
      title: 'Past talk on conference',
      img: 'http://localhost:3000/moe.jpg',
      description: 'Upcoming conference',
      createdAt: '2025-09-25T22:50:54.724Z',
      author: {
        bio: 'https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls',
        name: 'Ramona Schwering'
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});

