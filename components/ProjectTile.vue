<template>
  <section class="project-tile">
    <h2>{{ title }}</h2>
    <div class="project-tile__listing fade-out mostly-customized-scrollbar">
      <a v-for="entry in contents"
        :href="entry.html_url"
        target="_blank"
        rel="noopener"
        role="button"
        :aria-label="entry.full_name.replace(' ', '-')">
        <div class="project__link-tile handdraw-border">
          <h3 class="project__title">
            {{ entry.full_name }}
          </h3>
          <p v-if="entry.description">{{ entry.description }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectTile',

  props: {
    contents: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}

</script>

<style lang="scss" scoped>
.project-tile {

  .project__link-tile {
    padding: 10px 20px;
    max-height: 570px;
    min-height: 120px;
    margin: 10px 20px;

    p {
      margin-bottom: 30px;
      color: var(--color);
      height: auto;
    }

    &:hover {
      border: solid 3px var(--color-primary);
    }
  }

  .project__title {
    font-weight: normal;
    color: var(--color);
    top: 0;
    line-height: 1em;
    margin: 0;

    a {
      text-decoration: none;
    }
  }

  .project-tile__listing {
    overflow: scroll;
    overflow-x: hidden;
    height: 400px;
  }

  .fade-out {
    bottom: 0;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, var(--background-color) 100%);
  }

  .mostly-customized-scrollbar {
    display: block;
    overflow: auto;
  }

  .mostly-customized-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background: var(--border-color);
  }

  .mostly-customized-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
  }
}
</style>
