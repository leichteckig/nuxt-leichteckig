<template>
  <Page title="My talks">
    <h2>Meet me at...</h2>
    <section class="container upcoming-talks">
      <div class="image-container">
        <img alt="Moe giving talks" src="~/assets/images/talks.jpeg" class=" img-header"/>
      </div>
      <div class="talk-event-table">
        <table>
          <thead>
          <tr class="handdraw-line">
            <th>Talk title</th>
            <th>Conference / Event</th>
            <th>Date / Slot</th>
          </tr>
          </thead>
          <tbody>
          <tr class="handdraw-line">
            <td data-label="Title">How to survive conferences as an introvert</td>
            <td data-label="Conference"><a href="https://scd.shopware.com/">Shopware Community Day 2020</a></td>
            <td data-label="Date">02.09.2021</td>
          </tr>
          <tr class="handdraw-line">
            <td data-label="Title">How to survive conferences as an introvert</td>
            <td data-label="Conference"><a href="https://femtechconf.com/">FemTechConf</a></td>
            <td data-label="Date">24. - 25.09.2021</td>
          </tr>
          <tr class="handdraw-line">
            <td data-label="Title">Let's get visual</td>
            <td data-label="Conference"><a href="https://www.codetalks.de/home">code.talks</a></td>
            <td data-label="Date">28. - 29.10.2021</td>
          </tr>
          <tr class="handdraw-line talk--placeholder">
            <td data-label="Title"></td>
            <td data-label="Conference"></td>
            <td data-label="Date"></td>
          </tr>
          <tr class="handdraw-line">
            <td data-label="Title">Not always as a speaker, but it's our Cypress Germany meetup! ❤️ </td>
            <td data-label="Conference"><a href="https://www.meetup.com/de-DE/cypress-de-community/">Cypress DE Community</a></td>
            <td data-label="Date">Once in a quarter</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="container past-talks">
    <h2>Talks I held in the past</h2>
    <div class="featured-posts">
      <SmallTile
        :contents="pastTalks"
        slugName="talks"
      />
      </div>
    </section>
  </Page>
</template>

<script>
export default {
  name: 'talks',

  async asyncData({ $content, params }) {
    const pastTalks = await $content('talks')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch();

    return {
      pastTalks
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.upcoming-talks {
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
}

h2 {
  margin: 50px 0;
  text-align: center;
}

.img-header {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 75px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.talk-event-table {
  width: auto;
  display: block;
}

.talk-event-table * {
  box-sizing:border-box;
}
.talk-event-table table {
  width:100%;
}

.talk-event-table table,
.talk-event-table td,
.talk-event-table tr,
.talk-event-table th {
  border-collapse: collapse;
  text-align: left;
  max-width: 700px
}

.talk-event-table td,
.talk-event-table tr,
.talk-event-table th {
  padding:1em;
}

.talk-event-table th {
  font-weight: bold;
}

.talk--placeholder {

  background: repeating-linear-gradient(
    45deg,
    var(--border-color),
    var(--border-color) 1px,
    var(--bg) 1px,
    var(--bg) 10px
  );
}

@media screen and (max-width:700px) {

  .talk-event-table tr {
    border: none;
  }

  .talk-event-table td {
    padding:0;
  }

  .talk-event-table thead {
    display:none;
  }

  .talk-event-table tr {
    float: left;
    width: 100%;
  }

  .talk-event-table td {
    float: left;
    width: 100%;
    padding: 1em;
  }

  .talk-event-table td::before {
    content:attr(data-label);
    word-wrap: break-word;
    width: 20%;
    float:left;
    padding:1em;
    font-weight: bold;
    margin:-1em 1em -1em -1em;
  }
}

.talk {
  padding: 20px;
}
</style>
