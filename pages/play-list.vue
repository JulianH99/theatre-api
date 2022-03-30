<template>
  <div>
    <v-data-table :headers="headers" :items="plays" class="elevation-1">
      <template #item="row">
        <tr>
          <td>{{ row.item.title }}</td>
          <td>{{ row.item.playDate }}</td>
          <td>
            <v-btn
              elevation="2"
              color="success"
              @click="goToPanel(row.item.playId)"
              >Entrar</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'PlayList',
  async asyncData(context) {},
  data() {
    return {
      headers: [
        { text: 'Nombre de la Obra', value: 'title' },
        { text: 'Fecha', value: 'playDate' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      plays: [],
    }
  },
  mounted() {
    this.getPlays()
  },
  methods: {
    goToPanel(id) {
      this.$router.push(`/play-controls/${id}`)
    },
    async getPlays() {
      this.plays = await this.$axios.$get('/play')
    },
  },
}
</script>

<style></style>
