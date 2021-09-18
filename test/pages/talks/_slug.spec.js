/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import slug from '@/pages/talks/_slug.vue'
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

    const headComplement = {
      title: 'title',
    };
    const head = await component.head();
    component.data = function () {
      return {
        ...originalData,
        ...asyncData,
        ...head
      }
    };

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(slug, {
      stubs: {
        Page: Page,
        NuxtContent: {template: '<div></div>'},
        NuxtLink: {template: '<div></div>'},
        Hero: {template: '<div></div>'}
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i,
        switchLocalePath: i => i,
      }
    }, {
      title: 'A matter of trust – Test',
      description: 'Our daily work at Shopware',
      createdAt: '2020-07-19T22:50:54.724Z',
      author: {
        name: 'Ramona Schwering',
        image: 'https://avatars.githubusercontent.com/u/29896429?s=120&v=4'
      },
      tags: ['SCD21'],
      otherLanguages: {
        locale: 'en',
        path: '/de/blog/common-shopware-testing-pitfalls',
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
