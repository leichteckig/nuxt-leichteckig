<template>
  <section>
    <ul>
      <li
        v-for="color of colors"
        :key="color"
        class="color-item"
        :class="getClasses(color)"
        :data-cy="`${color}switch`"
        role="button"
        :aria-label="`${color}switch`"
        @click="$colorMode.preference = color"
      >
        <component
          :is="`icon-${color}`"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import IconSystem from '@/assets/icons/system.svg?inline'
import IconLight from '@/assets/icons/light.svg?inline'
import IconDark from '@/assets/icons/dark.svg?inline'

export default {
  name: 'ColorModePicker',

  components: {
    IconSystem,
    IconLight,
    IconDark
  },

  data() {
    return {
      colors: ['system', 'light', 'dark']
    }
  },

  methods: {
    getClasses(color) {
      if (this.$colorMode.unknown) {
        return {}
      }
      return {
        preferred: color === this.$colorMode.preference,
        selected: color === this.$colorMode.value
      }
    }
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
