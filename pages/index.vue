<template>
  <v-row>
    <v-col>
      <v-flex class="mb-2">
        <v-btn color="info" to="/application-list">
          Consultar convocatorias
        </v-btn>
      </v-flex>
      <PlayList :plays="plays" @apply="apply" />
    </v-col>
    <v-col>
      <PlayApplicationCard
        v-if="selectedPlay"
        :play="selectedPlay"
        :convocation="selectedPlayConvocation"
        @endApplication="endApplication"
      />
    </v-col>
    <v-snackbar v-model="successfulApplication">
      La aplicación a la convocatoria se ha registrado
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData(context) {
    const res = await context.$axios.get('/play')
    return { plays: res.data }
  },
  data() {
    return {
      plays: [],
      selectedPlay: null,
      selectedPlayConvocation: null,
      successfulApplication: false,
    }
  },
  methods: {
    apply(play, convocation) {
      this.selectedPlay = play
      this.selectedPlayConvocation = convocation
    },
    endApplication() {
      this.selectedPlay = null
      this.successfulApplication = true
    },
  },
}
</script>
