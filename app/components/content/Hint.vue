<template>
  <section
    data-cy="Hint"
    :class="getClasses"
  >
    <div class="hint__summary-card handdraw-border">
      <div class="hint__title">
        <span>
          {{ title }}
        </span>
      </div>
      <!-- div instead of p: markdown slot content arrives wrapped in a <p> -->
      <div
        class="hint__description"
        data-cy="DetailSummaryDescription"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  message: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: ''
  }
})

const getClasses = computed(() => {
  if (props.type === 'info') {
    return 'hint hint-info'
  }
  if (props.type === 'error') {
    return 'hint hint-error'
  }
  return 'hint hint-success'
})
</script>

<style lang="scss" scoped>

.hint__summary-card {
  padding: 20px;
}

.gradient {
  height: 30px;
  background: repeating-linear-gradient(
      45deg,
      var(--border-color),
      var(--border-color) 1px,
      var(--bg) 1px,
      var(--bg) 10px
  );
}

.hint__title {
  font-size: 30px;
  font-weight: bold;
  font-family: var(--font-family-secondary);
}

.handdraw-border {
  border-width: 2px;
}

/* light-dark() picks the variant with enough contrast for body text */
.hint-info {
  color: light-dark(#3A62B8, cornflowerblue);

  .handdraw-border {
    border-color: light-dark(#3A62B8, cornflowerblue);
  }
}

.hint-error {
  color: var(--color-primary);

  .handdraw-border {
    border-color: var(--color-primary);
  }
}

.hint-success {
  color: light-dark(#2E7D32, palegreen);

  .handdraw-border {
    border-color: light-dark(#2E7D32, palegreen);
  }
}
</style>
