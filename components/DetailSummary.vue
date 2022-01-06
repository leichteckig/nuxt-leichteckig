<template>
  <section data-cy="DetailSummary">
    <div class="handdraw-line" />
    <div class="gradient" />
    <div class="summary-detail__summary-card handdraw-line">
      <div class="summary-detail__author-card">
        <img
          v-if="article.author.image"
          class="summary-detail__author-img"
          :src="article.author.image"
          :alt="article.author.name"
        >
        <div class="summary-detail__basic-info summary-detail__text-muted">
          <div class="summary-detail__author-name">
            {{ article.author.name }}
          </div>
          <p>{{ formatDate(article.createdAt) }}</p>
        </div>
      </div>
      <p
        class="summary-detail__description"
        data-cy="DetailSummaryDescription"
      >
        {{ article.description }}
      </p>
      <div
        v-if="article.tags"
        :key="article.title"
        class="summary-detail__tag-container"
      >
        <div
          v-for="tag in article.tags"
          :key="tag"
          class="summary-detail__tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DetailSummary',

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
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
