<template>
  <div class="container">
    <!-- entry.img is used as link. Strange but serves the aim of getting a link only -->
    <a
      v-for="entry in contents"
      class="post handdraw-border"
      :href="entry.img"
      target="_blank"
    >
      <h3 class="post__title">
          {{ entry.title }}
      </h3>
      <p>{{ entry.description }}</p>
      <div class="link-tile__tag-container">
        <div v-if="entry.tags"
             v-for="tag in entry.tags"
             class="link-tile__tag handdraw-border">
          {{ tag }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "LinkTile",

  props: {
    contents: {
      type: Array,
      required: true
    }
  }
}

</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
}

.post {
  padding: 50px 25px;
  max-height: 570px;
}

.post p {
  margin-bottom: 30px;
  color: var(--color);
  height: auto;
}

.post__title {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
  color: var(--color-primary);
  top: 0;
}

.post__title a {
  text-decoration: none;
}

.post:hover {
  border: solid 3px var(--color-primary);
}


.link-tile__tag-container {
  display: flex;
  bottom: 0;
}

.link-tile__tag {
  border: solid 3px var(--color-primary);
  color: var(--color-primary);
  padding: 5px;
  margin: 5px;
}

</style>
