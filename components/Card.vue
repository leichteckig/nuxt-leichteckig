<template>
  <div
    v-bind="$attrs"
    class="card"
    :class="[ 'card--' + size ]">
    <div
      v-if="author"
      class="card__author">
      <slot name="author">
        <img
          v-if="authorImgUrl"
          class="card__author-image"
          :src="authorImgUrl"
          :alt="author"
        >
        {{ author }}
      </slot>
    </div>

    <h3
      v-if="title"
      class="author__title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h3>

    <div class="card__description">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',

  props: {
    size: {
      type: String,
      default: 'default',
      required: false
    },
    author: {
      type: String,
      required: false
    },
    authorImgUrl: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    imgUrl: {
      type: String,
      required: false
    },
    redirectRoute: {
      type: Object,
      required: false
    }
  }
}
</script>

<style scoped>

</style>
