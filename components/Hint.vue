<template>
  <section data-cy="Hint" :class="getClasses">
    <div class="hint__summary-card handdraw-border">
      <div class="hint__title">
        <span>
          {{ title }}
        </span>
      </div>
      <p class="hint__description" data-cy="DetailSummaryDescription">{{ message }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hint',

  props: {
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
    },
  },

  computed: {
    getClasses() {
      if (this.type === 'info') {
        return 'hint hint-info';
      }
      if (this.type === 'error') {
        return 'hint hint-error';

      }
      return 'hint hint-success';
    }
  },
}
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

.hint-info {
  color: cornflowerblue;

  .handdraw-border {
    border-color: cornflowerblue;
  }
}

.hint-error {
  color: var(--color-primary);

  .handdraw-border {
    border-color: var(--color-primary);
  }
}

.hint-success {
  color: palegreen;

  .handdraw-border {
    border-color: palegreen;
  }
}
</style>
