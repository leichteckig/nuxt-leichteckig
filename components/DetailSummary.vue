<template>
  <section>
    <div class="handdraw-line"></div>
    <div class="gradient"></div>
    <div class="summary-detail__summary-card handdraw-line">
      <div class="summary-detail__author-card">
        <img v-if="article.author.image"
          class="summary-detail__author-img"
          :src="article.author.image"
          :alt="article.author.name">
        <div class="summary-detail__basic-info summary-detail__text-muted">
          <div class="summary-detail__author-name">{{ article.author.name }}</div>
          <p>{{ formatDate(article.createdAt) }}</p>
        </div>
      </div>
      <h5 class="summary-detail__description">{{ article.description }}</h5>
      <div class="summary-detail__tag-container">
        <div v-if="article.tags"
             v-for="tag in article.tags"
             class="summary-detail__tag handdraw-border">
          {{ tag }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DetailSummary",

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  created() {
    console.log('this article', this.article)
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}


</script>

<style scoped>
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
.summary-detail__basic-info {
  display: flex;
}
.summary-detail__basic-info  p {
  margin: auto;
}

.summary-detail__text-muted {
  color: var(--color-text-muted);
}

.summary-detail__summary-card {
  padding: 30px;
}

.summary-detail__tag-container {
  display: flex;
}

.summary-detail__tag {
  border: solid 3px var(--color-primary);
  color: var(--color-primary);
  padding: 5px;
  margin: 5px;
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
