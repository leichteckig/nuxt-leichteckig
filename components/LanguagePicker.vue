<template>
  <div class="language-picker">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      class="language-picker-link"
      :to="switchLocalePath(locale.code)"
      :data-cy="`lang-${locale.code}`"
    >
      {{ locale.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "LanguagePicker",

  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
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
