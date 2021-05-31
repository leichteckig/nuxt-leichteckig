<template>
  <Page title="My talks">
    <h3>Upcoming talks</h3>

    <table>
      <thead>
        <tr>
          <th>Talk title</th>
          <th>Conference / Event</th>
          <th>Date / Slot</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>How to survive conferences as an introvert</td>
          <td>JSConf</td>
          <td>14.09.2021</td>
        </tr>
      </tbody>
    </table>

    <h3>Talks I held in the past</h3>
  </Page>
</template>

<script>
export default {
  name: "talks"
}
</script>

<style scoped>
  table {
    width: 100%;
    border: 1px solid var(--color-border);
    margin-bottom: 20px;
    border-collapse: collapse;
  }

  table th {
    text-align: left;
    background-color: var(--color-background-light);
  }

  table th,
  table td {
    padding: 12px;
  }
</style>
