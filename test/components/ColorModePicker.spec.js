import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ColorModePicker from '~/components/ColorModePicker.vue'

describe('ColorModePicker component', () => {
  it('should be a Vue instance', async () => {
    const wrapper = await mountSuspended(ColorModePicker);

    expect(wrapper.vm).toBeTruthy();
  });

  it('should render a switch for every color mode', async () => {
    const wrapper = await mountSuspended(ColorModePicker);

    expect(wrapper.findAll('.color-item')).toHaveLength(3);
    expect(wrapper.find('[data-cy=systemswitch]').exists()).toBe(true);
    expect(wrapper.find('[data-cy=lightswitch]').exists()).toBe(true);
    expect(wrapper.find('[data-cy=darkswitch]').exists()).toBe(true);
  });

  it('should set dark mode on click', async () => {
    const wrapper = await mountSuspended(ColorModePicker);
    await nextTick();

    await wrapper.find('[data-cy=darkswitch]').trigger('click');
    await nextTick();

    expect(wrapper.find('[data-cy=darkswitch]').classes()).toContain('preferred');
  });

  it('should set light mode on click', async () => {
    const wrapper = await mountSuspended(ColorModePicker);
    await nextTick();

    await wrapper.find('[data-cy=lightswitch]').trigger('click');
    await nextTick();

    expect(wrapper.find('[data-cy=lightswitch]').classes()).toContain('preferred');
    expect(wrapper.find('[data-cy=lightswitch]').classes()).toContain('selected');
  });
});
