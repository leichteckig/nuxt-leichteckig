<template>
  <section class="link-tile">
    <!-- entry.img is used as link. Strange but serves the aim of getting a link only -->
    <a
      v-for="entry in contents"
      :key="entry.title"
      class="post handdraw-border"
      :href="entry.img"
      target="_blank"
      role="button"
      :aria-label="entry.title.replace(' ', '-')"
    >
      <h3 class="post__title">
        {{ entry.title }}
      </h3>
      <p v-if="entry.description">{{ entry.description }}</p>
      <div
        v-if="entry.tags"
        class="link-tile__tag-container"
      >
        <div
          v-for="tag in entry.tags"
          :key="tag"
          class="link-tile__tag handdraw-border"
        >
          {{ tag }}
        </div>
      </div>
    </a>
  </section>
</template>

<script>
export default {
  name: 'LinkTile',

  props: {
    contents: {
      type: Array,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
.link-tile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 60px;
}

.post {
  padding: 50px 25px;
  max-height: 570px;

  p {
    margin-bottom: 30px;
    color: var(--color);
    height: auto;
  }

  &:hover {
    border: solid 3px var(--color-primary);
  }
}

.post__title {
  font-weight: normal;
  margin-bottom: 20px;
  color: var(--color-primary);
  top: 0;

  a {
    text-decoration: none;
  }
}

.link-tile__tag-container {
  display: flex;
  flex-wrap: wrap;
  bottom: 0;
}

.link-tile__tag {
  border: solid 3px var(--color-primary);
  color: var(--color-primary);
  padding: 5px;
  margin: 5px;
}
</style>
