<template>
  <section
    class="polaroid__outer-frame handdraw-border"
    data-cy="Polaroid"
  >
    <div :class="getClasses">
      <img
        class="polaroid__image"
        :src="imagePath"
        alt="Ramona"
        height="260px"
        width="260px"
      >
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
        return 'handdraw-border polaroid__purple';
      }
       else if (this.type === 'primary') {
        return 'handdraw-border polaroid__primary';
      }
       else if (this.type === 'rose') {
        return 'handdraw-border polaroid__rose';
      }
      return 'handdraw-border polaroid__line';
    }
  }
}
</script>

<style lang="scss" scoped>
.polaroid__outer-frame {
  margin: 0 auto;
  max-width: 330px;
  max-height: 450px;

  border-color: var(--color);

  background: repeating-linear-gradient(
      45deg,
      var(--color),
      var(--color) 1px,
      var(--bg) 1px,
      var(--bg) 10px
  );

  .handdraw-border {
    border: solid 3px var(--color);

    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;

    overflow: hidden;
  }

  .polaroid__image {
    margin-left: auto;
    width: 260px;
    height: 260px;
    bottom: 0;
  }

  .polaroid__purple {
    margin: 30px 30px 130px 30px;
    background-color: #9da1ff;
  }

  .polaroid__line {
    margin: 30px 30px 130px 30px;
    background-color: var(--color);
  }

  .polaroid__primary {
    margin: 30px 30px 130px 30px;
    background-color: var(--color-primary);
  }

  .polaroid__rose {
    margin: 30px 30px 130px 30px;
    background-color: #C05746;
    border-color: var(--color);
  }
}

@media (max-width: 450px) {
  .polaroid__outer-frame {
    max-width: 275px;
    border-color: var(--color);

    .polaroid__image {
      width: 200px;
      height: 200px;
    }
  }
}

@media (max-width: 350px) {
  .polaroid__outer-frame {
    max-width: 220px;
    max-height: 300px;
    border-color: var(--color);

    .polaroid__image {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
