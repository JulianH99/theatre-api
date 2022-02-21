<template>
  <v-row justify="center">
    <v-col sm="7">
      <h1>Consultar convocatorias</h1>
      <v-text-field
        v-model="code"
        label="Código estudiantil"
        :rules="rules"
      ></v-text-field>
      <v-btn color="info" class="mt-2" @click="checkApplications"
        >Consultar convocatorias</v-btn
      >
      <v-data-table :headers="headers" :items="convocations" class="mt-6">
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    code: '',
    rules: [(v) => !!v || 'El código es requerido'],
    convocations: [],
    headers: [
      { text: 'Obra', value: 'title' },
      { text: 'Personaje', value: 'character' },
      { text: 'Fecha de audición', value: 'auditionDate' },
    ],
  }),
  methods: {
    async checkApplications() {
      if (this.code) {
        const { data: convocations } = await this.$axios.get(
          `/student/${this.code}/convocations`
        )

        this.convocations = convocations.map((item) => {
          item.auditionDate = new Date(item.auditionDate).toLocaleDateString(
            'es-ES'
          )
          return item
        })
      }
    },
  },
}
</script>
