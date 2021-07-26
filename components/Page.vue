<template>
  <div class="page">
    <div class="page__title">
      <div class="container">
        <h1>{{ title }}</h1>
      </div>
    </div>
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
    }
  }
}
</script>

<style scoped>
  .page__title {
    padding: 36px 0;
    margin-bottom: 40px;

    border-bottom: solid 3px var(--border-color);
    border-bottom-right-radius: 255px 15px;
    border-bottom-left-radius: 100px 30px;
  }

  .page__title h1 {
    margin-bottom: 0;
    margin-top: 0;
  }
</style>
