<template>
  <div class="page">
    <section class="page__title">
      <div class="container">
        <h1>{{ title }}</h1>
      </div>
    </section>
    <section v-if="img">
      <Hero :img="img">
      </Hero>
    </section>
    <div class="page__content">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Page title'
    },
    img: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
  .page__title {
    padding: 36px 0;

    border-bottom: solid 3px var(--border-color);
  }

  .page__title h1 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .page__content {
    margin-top: 40px;
  }
</style>
