/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import privacy from '@/pages/privacy.vue';
import Page from '@/components/Page.vue';
import VueMeta from 'vue-meta';

// create vue with vue-meta
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })

describe('Conference page', () => {

  const getInitialised = async function (privacy, options = {}) {
    let component = privacy

    const head = await component.head();
    component.data = function () {
      return {
        ...head
      }
    }

    return shallowMount(component, options)
  }

  it('should be a Vue instance', async () => {
    const wrapper = await getInitialised(privacy, {
      stubs: {
        Page: Page
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
