/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import index from '@/pages/talks/index.vue';
import Page from '@/components/Page.vue';
import Button from '@/components/Button.vue';
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
                  limit: () => {
                    return {
                      fetch: () => {
                        return []
                      },
                    }
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
        Button: { template: '<div></div>' },
        SmallTile: { template: '<div></div>' },
        Hero: { template: '<div></div>' }
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it('should have link to past talks', async () => {
    const mockMethod = jest.spyOn(index.methods, 'openLink');
    global.open = jest.fn();
    const wrapper = mount(index, {
      propsData: {
        media: [{
          name: 'Slides',
          url: 'https://speakerdeck.com/leichteckig/lets-get-visual-visuelles-testing-in-deinem-symfony-projekt'
        }]
      },
      stubs: {
        Page: Page,
        Button: Button,
        SmallTile: { template: '<div></div>' },
        Hero: { template: '<div></div>' }
      }
    });
    const button = wrapper.find('[data-cy=ButtonToSlideDeck]');

    wrapper.vm.method = mockMethod;
    await button.trigger('click');
    expect(mockMethod).toHaveBeenCalled();
  });
});
