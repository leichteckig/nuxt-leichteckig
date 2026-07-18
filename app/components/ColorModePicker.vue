<template>
  <section>
    <ul>
      <li
        v-for="color of colors"
        :key="color"
      >
        <button
          type="button"
          class="color-item"
          :class="getClasses(color)"
          :data-cy="`${color}switch`"
          :aria-label="`Use ${color} color mode`"
          @click="colorMode.preference = color"
        >
          <component :is="icons[color]" />
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import IconSystem from '~/assets/icons/system.svg'
import IconLight from '~/assets/icons/light.svg'
import IconDark from '~/assets/icons/dark.svg'

const colorMode = useColorMode()

const colors = ['system', 'light', 'dark']

const icons = {
  system: IconSystem,
  light: IconLight,
  dark: IconDark
}

// The preference is only known on the client — skip the highlight classes
// during SSR and hydration to avoid a hydration mismatch.
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

function getClasses(color) {
  if (!isMounted.value || colorMode.unknown) {
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
  padding: 0;
  background: none;
  color: inherit;
  border: solid 3px var(--color);

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius: 15px 255px;
}

/* nuxt-svgo strips the icons' own dimensions, so size them here —
   otherwise they fill the whole box and touch the border */
.color-item svg {
  width: 20px;
  height: 20px;
}

p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
</style>
