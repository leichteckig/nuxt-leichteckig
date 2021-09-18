/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from '@vue/test-utils'
import conferences from '@/pages/conferences.vue'
import Page from '@/components/Page.vue'
import Table from '@/components/TableOverview.vue'
import VueMeta from 'vue-meta'

// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('Conference page', () => {

  const getInitialised = async function (conferences, options = {}, appearances = []) {
    let component = conferences

    if (!component.asyncData) {
      return shallowMount(component);
    }

    let originalData = []
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
                    return appearances
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
        ...originalData,
        ...asyncData,
        ...head
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(conferences, {
      stubs: {
        Page: Page,
        TableOverview: { template: '<div></div>' },
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    }, []);
    expect(wrapper.vm).toBeTruthy();
  });
});
