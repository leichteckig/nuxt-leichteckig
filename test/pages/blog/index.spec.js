/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import index from '@/pages/blog/index.vue';
import Page from '@/components/Page.vue';
import VueMeta from 'vue-meta';

// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('Conference page', () => {

  const getInitialised = async function (index, options = {}) {
    let component = index;

    if (!component.asyncData) {
      return shallowMount(component);
    }

    let originalData = [];
    if (component.data != null) {
      originalData = component.data()
    }
    const asyncData = await component.asyncData({
      $content: () => {
        return {
          only: () => {
            return {
              sortBy: () => {
                return {
                  fetch: () => {
                    return []
                  },
                }
              },
            }
          }
        }
      },
    });

    const head = await component.head();
    component.data = function () {
      return {
        ...head,
        ...originalData,
        ...asyncData
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(index, {
      stubs: {
        Page: Page,
        LargeTile: { template: '<div></div>' }
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
