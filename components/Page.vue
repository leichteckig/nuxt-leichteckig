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
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 40px;
  }

  .page__title h1 {
    margin-bottom: 0;
  }
</style>
