/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from '@vue/test-utils'
import about from '@/pages/about.vue'
import Page from '@/components/Page.vue'
import VueMeta from 'vue-meta'

// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('About page', () => {

  const getInitialised = async function (about, options = {}) {
    let component = about;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{
          full_name: 'leichteckig/my-project',
          description: 'Lorem ipsum',
          html_url: 'https://github.com/leichteckig'
        }]),
      })
    );

    let originalData = [];
    if (component.data != null) {
      originalData = component.data()
    }

    const head = await component.head();
    component.data = function () {
      return {
        ...originalData,
        ...head
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(about, {
      stubs: {
        Page: Page,
        Polaroid: { template: '<div></div>' },
        ProjectTile: { template: '<div></div>' },
        Hero: { template: '<div></div>' },
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });
});
