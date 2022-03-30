<template>
  <div class="d-flex justify-center certificates-container pb-6">
    <div class="students-list">
      <template v-if="selectedPlay.title">
        <template v-if="students && students.length > 0">
          <v-data-table :headers="headers" :items="students">
            <template #[`item.certificate`]="{ item }">
              <v-simple-checkbox v-model="item.certificate">
              </v-simple-checkbox>
            </template>
          </v-data-table>

          <div class="d-flex justify-end mt-4">
            <v-btn
              color="primary"
              class="mr-4"
              :loading="loading"
              :disabled="loading"
              @click="generateCertificates()"
              >Generar todos los certificados</v-btn
            >
            <v-btn
              color="success"
              :disabled="!certificatesSelected || loading"
              :loading="loading && certificatesSelected"
              @click="generateCertificates()"
            >
              Generar certificados seleccionados
            </v-btn>
          </div>
        </template>
        <v-alert v-else type="warning">
          No hay estudiantes registrados en esta obra
        </v-alert>
      </template>
    </div>
    <v-snackbar v-model="showSuccess" color="success">
      Se han enviado con éxito los certificados
    </v-snackbar>
    <v-snackbar v-model="showError" color="error">
      Ha ocurrido un error al enviar los certificados. Por favor intentelo de
      nuevo más tarde
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'CertificatesByPlay',
  props: {
    play: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    tab: '',
    students: null,
    selectedPlay: {},
    loading: false,
    showSuccess: false,
    showError: false,
    headers: [
      {
        text: 'Código',
        value: 'code',
      },
      {
        text: 'Nombres',
        value: 'names',
      },
      {
        text: 'Apellidos',
        value: 'lastNames',
      },
      {
        text: 'Personaje',
        value: 'character',
      },
      {
        text: 'Generar certificado',
        value: 'certificate',
      },
    ],
  }),
  computed: {
    certificatesSelected() {
      return this.students.filter((st) => st.certificate).length > 0
    },
  },
  mounted() {
    this.getStudents(this.play)
  },
  methods: {
    async getStudents(play) {
      this.selectedPlay = play
      const students = await this.$axios.$get(`/play/${play.playId}/students`)

      this.students = students
    },

    async generateCertificates() {
      try {
        this.loading = true
        const selectedStudents = this.students
          .filter((st) => st.certificate)
          .map((st) => st.code)
        await this.$axios.$post(
          `/play/${this.selectedPlay.playId}/certificates`,
          selectedStudents
        )
        this.showSuccess = true
        this.students = this.students.map((st) => ({
          ...st,
          certificate: false,
        }))
      } catch (e) {
        this.showError = true
      }
      this.loading = false
    },
  },
}
</script>

<style>
.students-list {
  width: 95%;
  flex-shrink: 0;
}

.play-content span {
  display: block;
}
</style>
