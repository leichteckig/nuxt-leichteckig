import {shallowMount} from '@vue/test-utils'
import TableOverview from '@/components/TableOverview.vue'

describe('TableOverview component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(TableOverview, {
      propsData: {
        contents: [],
        slugName: 'TableOverview'
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display an upcoming conference', () => {
    const wrapper = shallowMount(TableOverview, {
      propsData: {
        contents: [{
          title: 'Upcoming talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Upcoming conference',
          alt: '2021.10.10'
        }],
        slugName: 'TableOverview'
      }
    });

    expect(wrapper.find('td[data-label=Title]').text()).toContain('Upcoming talk on conference');
    expect(wrapper.find('td[data-label=Conference]').text()).toContain('Upcoming conference');
    expect(wrapper.find('.talk-event-table__url').attributes().href).toBe('http://localhost:3000/moe.jpg');
    expect(wrapper.find('td[data-label=Date]').text()).toContain('2021.10.10');
  });

  it('cross out an old conference', () => {
    const wrapper = shallowMount(TableOverview, {
      propsData: {
        contents: [{
          title: 'Upcoming talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Upcoming conference',
          alt: '2021.10.10',
          tags: [
            'old'
          ]
        }],
        slugName: 'TableOverview'
      }
    });
    expect(wrapper.find('.talk--old')).toBeTruthy();
  });
});
