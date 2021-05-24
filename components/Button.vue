<template>
  <button
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
  border-radius: 6px;
  color: #fff;
  text-decoration: none;
  background-color: var(--color-primary);
  font-family: var(--font-family-default);
  font-size: 16px;
  border: 0;
  padding: 12px 30px;
  cursor: pointer;
}

.button--secondary {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 11px 30px;
}

</style>
