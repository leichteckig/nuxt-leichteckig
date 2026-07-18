import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TableOverview from '~/components/TableOverview.vue'

describe('TableOverview component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(TableOverview, {
      props: {
        contents: []
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it('should display an upcoming conference', async () => {
    const wrapper = await mountSuspended(TableOverview, {
      props: {
        contents: [{
          title: 'Upcoming talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Upcoming conference',
          alt: 'September 25, 2999',
          createdAt: '2999-09-25T22:50:54.724Z'
        }]
      }
    });

    expect(wrapper.find('td[data-label=Title]').text()).toContain('Upcoming talk on conference');
    expect(wrapper.find('td[data-label=Conference]').text()).toContain('Upcoming conference');
    expect(wrapper.find('.talk-event-table__url').attributes().href).toBe('http://localhost:3000/moe.jpg');
    expect(wrapper.find('td[data-label=Date]').text()).toContain('September 25, 2999');
  });

  it('cross out an old conference', async () => {
    const wrapper = await mountSuspended(TableOverview, {
      props: {
        contents: [{
          title: 'Past talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Past conference',
          alt: 'September 25, 2020',
          createdAt: '2020-09-25T22:50:54.724Z'
        }]
      }
    });
    expect(wrapper.find('.talk--old').exists()).toBe(true);
    expect(wrapper.find('.talk--old td[data-label=Title]').text()).toContain('Past talk on conference');
  });

  it('show Cypress meetup and placeholders', async () => {
    // placeholders and the meetup row are only shown while there are no past talks
    const wrapper = await mountSuspended(TableOverview, {
      props: {
        contents: [{
          title: 'Upcoming talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Upcoming conference',
          alt: 'September 25, 2998',
          createdAt: '2998-09-25T22:50:54.724Z'
        },{
          title: 'Another upcoming talk on conference',
          img: 'http://localhost:3000/moe.jpg',
          description: 'Upcoming conference',
          alt: 'September 25, 2999',
          createdAt: '2999-09-25T22:50:54.724Z'
        }]
      }
    });

    expect(wrapper.find('.talk--placeholder').exists()).toBe(true);
    expect(wrapper.find('.talk--cyde').exists()).toBe(true);

    expect(wrapper.find('.talk--cyde').text())
      .toContain('Not always as a speaker, but as meetup host! ❤️');
  });
});
