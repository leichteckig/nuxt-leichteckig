import { shallowMount } from '@vue/test-utils'
import SocialButtonGroup from '@/components/SocialButtonGroup.vue'

describe('ColorModePicker component', () => {
  it('should be a Vue instance', () => {
    const wrapper = shallowMount(SocialButtonGroup)

    expect(wrapper.vm).toBeTruthy()
  })
})
