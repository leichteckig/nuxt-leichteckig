/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import DetailSummary from '@/components/DetailSummary.vue'

describe('DetailSummary component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(DetailSummary, {
      propsData: {
        article: {
          author: {
            image: ''
          }
        }
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
