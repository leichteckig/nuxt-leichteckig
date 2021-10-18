<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="[ 'button--' + variant ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',

  props: {
    variant: {
      type: String,
      default: 'default',
      required: false
    }
  }
})
</script>

<style lang="scss">
.button {
  display: inline-block;
  color: var(--bg);
  text-decoration: none;
  background-color: var(--color-primary);
  font-family: var(--font-family-default);
  font-size: 16px;
  padding: 12px 30px;
  cursor: pointer;
  border: solid 3px var(--color-primary);
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;

  &--secondary {
     background-color: transparent;
     color: var(--color-primary);
     padding: 11px 30px;
     bottom: 0;
     border: solid 3px var(--color-primary);
     border-top-left-radius: 255px 15px;
     border-top-right-radius: 15px 255px;
     border-bottom-right-radius: 225px 15px;
     border-bottom-left-radius:15px 255px;
   }
}
</style>
