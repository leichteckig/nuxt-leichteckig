<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="[ 'button--' + variant ]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    variant: {
      type: String,
      default: 'default',
      required: false
    }
  }
}
</script>

<style scoped>
.button {
  display: inline-block;
  color: #fff;
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

}

.button--secondary {
  background-color: transparent;
  color: var(--color-primary);
  padding: 11px 30px;

  bottom: 0;
  margin: 50px auto 0 auto;
  border: solid 3px var(--color-primary);

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;
}
</style>
