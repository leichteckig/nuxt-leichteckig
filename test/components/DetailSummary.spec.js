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

  it('should display the most important article information', () => {
    const wrapper = shallowMount(DetailSummary, {
      propsData: {
        article: {
          title: 'Article title ftw',
          description:  'Automation traps in the context of working with Shopware.',
          img: 'smashing-testing-pitfalls/bingo.jpg',
          createdAt: '2021-09-28T00:00:00.724Z',
          alt: 'common Shopware testing traps',
          author: {
            image: ''
          },
          tags: [
            'Shopware',
            'Unit Tests',
            'End-To-End Tests',
            'Testing pitfalls'
          ]
        }
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });
});
