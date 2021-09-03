<template>
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
      <tr v-if="contents.length"
          v-for="entry in contents"
          :class="getTableClasses(entry)">
        <td data-label="Title">
          {{ entry.title }}
        </td>
        <td data-label="Conference">
          <a v-if="entry.link" :href="entry.link">
            {{ entry.eventTitle }}
          </a>
          <span v-else>
            {{ entry.eventTitle }}
          </span>
        </td>
        <td data-label="Date">
          {{ entry.date }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "TableOverview",

  props: {
    contents: {
      type: Array,
      required: true
    }
  },

  methods: {
    getTableClasses(entry) {
      if(entry.placeholder) {
        return 'handdraw-line talk--placeholder'
      }
      if(entry.old) {
        return 'handdraw-line talk--old'
      }
      return 'handdraw-line';
    }
  }
}
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

  .talk--placeholder {
    background: repeating-linear-gradient(
      45deg,
      var(--color-secondary),
      var(--color-secondary) 1px,
      var(--bg) 1px,
      var(--bg) 10px
    );
  }

  .talk--old {
    text-decoration: line-through;
    color: gray;
  }

  @media screen and (max-width: 700px) {
    .talk-event-table thead {
      display: none;
    }

    .talk-event-table tr {
      float: left;
      width: 100%;
      padding: 1em 0;
    }

    .talk-event-table .talk--placeholder td {
      display: none;
    }

    .talk-event-table td {
      float: left;
      width: 100%;
      padding: 1em 0;
      display: flex;
    }

    .talk-event-table td::before {
      content:attr(data-label);
      width: min-content;
      min-width: 110px;
      font-weight: bold;
    }
  }
</style>
