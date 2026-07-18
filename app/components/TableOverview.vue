<template>
  <section class="talk-event-table">
    <table>
      <thead>
        <tr class="handdraw-line">
          <th>{{ $t('eventTitle') }}</th>
          <th>{{ $t('eventType') }}</th>
          <th>{{ $t('eventDate') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in upcomingTalks"
          :key="entry.createdAt"
          class="handdraw-line"
        >
          <td data-label="Title">
            {{ entry.title }}
          </td>
          <td data-label="Conference">
            <!-- entry.img == link of the event -->
            <a
              v-if="entry.img"
              class="talk-event-table__url"
              :href="entry.img"
              target="_blank"
              rel="noopener"
            >

              <!-- entry.description == Event title -->
              {{ entry.description }}
            </a>
            <span v-else>

              <!-- entry.description == Event title -->
              {{ entry.description }}
            </span>
          </td>
          <td data-label="Date">
            <!-- entry.alt == Date of the event in more pretty -->
            <span v-if="entry.alt">
              {{ entry.alt }}
            </span>
          </td>
        </tr>
        <tr
          v-for="entry in pastTalks"
          :key="entry.createdAt"
          class="handdraw-line talk--old"
        >
          <td data-label="Title">
            <!-- entry.img == link of the event -->
            <span>
              {{ entry.title }}
            </span>
          </td>
          <td data-label="Conference">
            <!-- entry.img == link of the event -->
            <a
              v-if="entry.img"
              class="talk-event-table__url"
              :href="entry.img"
              target="_blank"
              rel="noopener"
            >
              <!-- entry.description == Event title -->
              {{ entry.description }}
            </a>
            <span v-else>
              <!-- entry.description == Event title -->
              {{ entry.description }}
            </span>
          </td>
          <td data-label="Date">
            <!-- entry.alt == Date of the event in more pretty -->
            <span v-if="entry.alt">
              {{ entry.alt }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
const props = defineProps({
  contents: {
    type: Array,
    required: true
  }
})

function isUpcoming(eventDate) {
  return Date.now() <= Date.parse(eventDate)
}

const upcomingTalks = computed(() => props.contents.filter(talk => isUpcoming(talk.createdAt)))
const pastTalks = computed(() => props.contents.filter(talk => !isUpcoming(talk.createdAt)))
</script>

<style scoped>
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
  }

  .talk-event-table td,
  .talk-event-table tr,
  .talk-event-table th {
    padding:1em;
  }

  .talk-event-table th {
    font-weight: bold;
  }

  .talk--old {
    text-decoration: line-through;
    color: gray;
  }

  @media screen and (max-width: 700px) {
    tr :last-child {
      margin-bottom: 10px;
    }

    .talk-event-table thead {
      display: none;
    }

    .talk-event-table tr {
      float: left;
      width: 100%;
      padding: 1em 0;
    }

    .talk-event-table td {
      float: left;
      width: 100%;
      padding: 1em 0;
      display: flex;
    }

    .talk-event-table td::before {
      content: attr(data-label);
      width: min-content;
      min-width: 110px;
      font-weight: bold;
    }

    .talk--old td {
      text-decoration: line-through;
    }
  }
</style>
