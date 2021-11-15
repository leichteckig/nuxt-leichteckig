/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import Page from '@/components/Page.vue'

describe('Page component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(Page);
    expect(wrapper.vm).toBeTruthy();
  });
});
