/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import imprint from '@/pages/imprint.vue';
import Page from '@/components/Page.vue';
import VueMeta from 'vue-meta';

// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('Conference page', () => {

  const getInitialised = async function (imprint, options = {}) {
    let component = imprint

    const head = await component.head();
    component.data = function () {
      return {
        ...head
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(imprint, {
      stubs: {
        Page: Page
      },
      mocks: {
        $t: () => 'some specific text',
        localePath: i => i
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
