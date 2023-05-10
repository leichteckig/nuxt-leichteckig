<template>
  <section data-cy="TagCard" class="handdraw-line">
    <div class="handdraw-line"></div>
    <div class="gradient"></div>
    <div class="summary-detail__summary-card">
      <p class="summary-detail__description" data-cy="DetailSummaryDescription">{{ description }}</p>
      <div class="summary-detail__tag-container">
        <div
          v-if="tags"
          v-for="tag in tags"
          :class="getTagClasses(tag)"
          @click.prevent="filterList(tag)"
        >
          {{ tag }}
        </div>
        <div
          :class="getTagClasses()"
          @click.prevent="resetList()">
          x
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TagCard',

  props: {
    tags: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: false
    },
  },

  data() {
    return {
      currentTag: null
    }
  },

  methods: {
    getTagClasses(tag) {
      const current = !!(this.currentTag && this.currentTag !== tag);
      console.log(current)

      if (current && tag != null) {
        return 'summary-detail__tag summary-detail__tag--inactive handdraw-border';
      }
      if (!current && tag == null) {
        return 'summary-detail__tag summary-detail__tag--inactive handdraw-border';
      }
      return 'summary-detail__tag handdraw-border';
    },

    async filterList(tag) {
      this.currentTag = tag;
      this.$emit('filter', tag);
    },

    async resetList() {
      this.currentTag = null;
      this.$emit('reset');
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-detail__author-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.summary-detail__author-card {
  display: flex;
}

.summary-detail__author-name {
  margin: auto 10px;
}

.summary-detail__description {
  font-size: 20px;
}

.summary-detail__basic-info {
  display: flex;

  p {
    margin: auto;
  }
}

.summary-detail__text-muted {
  color: var(--color-text-muted);
}

.summary-detail__summary-card {
  padding: 30px;
}

.summary-detail__tag-container {
  display: flex;
  flex-wrap: wrap;
}

.summary-detail__tag {
  border: solid 3px var(--color-primary);
  color: var(--color-primary);
  padding: 5px;
  margin: 5px;
  max-height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-detail__tag--inactive {
  border: solid 3px var(--border-color);
  color: var(--border-color);
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
</style>
