<template>
  <div class="language-picker">
    <NuxtLink 
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      :data-cy="`lang-${locale.code}`"
      class="language-picker-link"
        >
        {{ locale.name }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

<style scoped>
  .language-picker-link {
    display: block;
    line-height: 57px;
    padding: 10px 20px;
    text-decoration: none;
    color: var(--color);
  }

  .language-picker {
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
</style>
