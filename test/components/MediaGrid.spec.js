import { shallowMount } from '@vue/test-utils'
import MediaGrid from '@/components/MediaGrid.vue'

describe('MediaGrid component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(MediaGrid, {
      propsData: {
        media: [{
          name: 'SCD\'21',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      }
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it.skip('should render image path', () => {
    const wrapper = shallowMount(MediaGrid, {
      propsData: {
        media: [{
          name: 'SCD\'21',
          url: 'https://www.youtube.com/embed/sxvQoWF4KS0'
        }]
      }
    })

    expect(wrapper.find('iframe').attributes().src).toBe('https://www.youtube.com/embed/sxvQoWF4KS0')
  })
})
