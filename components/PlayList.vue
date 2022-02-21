<template>
  <v-card class="" max-width="600" tile>
    <v-list-item v-for="play in plays" :key="play.playId" two-line>
      <v-list-item-content>
        <v-list-item-title>{{ play.title }}</v-list-item-title>
        <v-list-item-subtitle
          ><b>Escrito por:</b> {{ play.writer }}</v-list-item-subtitle
        >
      </v-list-item-content>
      <v-list-item-action>
        <v-btn class="ma-2" color="info" @click="checkConvocations(play)">
          Aplicar
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <div v-if="plays.length === 0">
      <h1 class="red--text px-2">No hay obras registradas</h1>
    </div>
    <v-snackbar v-model="noConvocations">
      La obra no tiene convocatorias activas
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: {
    plays: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    noConvocations: false,
  }),
  methods: {
    async checkConvocations(play) {
      const { data: convocation } = await this.$axios.get(
        `/play/${play.playId}/convocation`
      )

      if (convocation) {
        this.$emit('apply', play, convocation)
      } else {
        this.noConvocations = true
      }
    },
  },
}
</script>
