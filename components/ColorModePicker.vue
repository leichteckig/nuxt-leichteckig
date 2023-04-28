<template>
  <section>
    <ul>
      <li
        class="color-item"
        :class="getClasses('system')"
        data-cy="system-switch"
        role="button"
        aria-label="system-switch`"
        @click="colorMode.preference = 'system'"
      >
        <nuxt-icon name="system" />
      </li>
      <li
        class="color-item"
        :class="getClasses('system')"
        data-cy="system-switch"
        role="button"
        aria-label="system-switch`"
        @click="colorMode.preference = 'system'"
      >
        <nuxt-icon name="light" />
      </li>
      <li
        class="color-item"
        :class="getClasses('system')"
        data-cy="system-switch"
        role="button"
        aria-label="system-switch`"
        @click="colorMode.preference = 'system'"
      >
        <nuxt-icon name="dark" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

type ColorModes = 'system' | 'light' | 'dark';

function getClasses(color: ColorModes) {
  if (colorMode.unknown) {
    return {}
  }
  return {
    preferred: color === colorMode.preference,
    selected: color === colorMode.value
  }
}
</script>

<style scoped>
.color-item.preferred {
  border-color: var(--color-primary);
}

.color-item.selected {
  color: var(--color-primary);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 5px;
}

.color-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  margin: auto 0;
  height: 40px;
  width: 40px;
  cursor: pointer;
  border: solid 3px var(--color);

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;
}

p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
</style>
