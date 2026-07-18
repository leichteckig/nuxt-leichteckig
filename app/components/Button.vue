<template>
  <!-- Navigation renders as a real link so it works before hydration
       (and without JavaScript); only actions render as <button> -->
  <NuxtLink
    v-if="to"
    :to="to"
    v-bind="$attrs"
    class="button"
    :class="[ 'button--' + variant ]"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    v-bind="$attrs"
    class="button"
    :class="[ 'button--' + variant ]"
  >
    <slot />
  </a>
  <button
    v-else
    v-bind="$attrs"
    class="button"
    :class="[ 'button--' + variant ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineOptions({
  name: 'Button',
  // attrs (incl. listeners) are bound explicitly on the root element
  inheritAttrs: false
})

defineProps({
  variant: {
    type: String,
    default: 'default',
    required: false
  },
  to: {
    type: [String, Object],
    default: null,
    required: false
  },
  href: {
    type: String,
    default: null,
    required: false
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
