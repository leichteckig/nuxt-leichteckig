<template>
  <section class="outer-frame handdraw-border" data-cy="Polaroid">
    <div :class="getClasses">
      <img class="image" :src="imagePath" alt="Ramona">
    </div>
  </section>
</template>

<script>

export default {
  name: "Polaroid",

  props: {
    imagePath: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'line'
    }
  },

  computed: {
    getClasses() {
      if (this.type === 'purple') {
        return 'handdraw-border purple';
      }
       else if (this.type === 'primary') {
        return 'handdraw-border primary';
      }
       else if (this.type === 'rose') {
        return 'handdraw-border rose';
      }
      return 'handdraw-border line';
    }
  }
}
</script>

<style scoped>
.outer-frame {
  margin: 0 auto;

  background: repeating-linear-gradient(
    45deg,
    var(--color),
    var(--color) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}

.handdraw-border {
  border: solid 3px var(--color);

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;

  overflow: hidden;
}

.image {
  margin-left: auto;
  width: 260px;
  height: 260px;
  bottom: 0;
}

.purple {
  margin: 30px 30px 130px 30px;
  background-color: #9da1ff;
}

.line {
  margin: 30px 30px 130px 30px;
  background-color: var(--color);
}

.primary {
  margin: 30px 30px 130px 30px;
  background-color: var(--color-primary);
}

.rose {
  margin: 30px 30px 130px 30px;
  background-color: #C05746;
}

@media (max-width: 450px) {
  .image {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 350px) {
  .image {
    width: 150px;
    height: 150px;
  }
}
</style>
