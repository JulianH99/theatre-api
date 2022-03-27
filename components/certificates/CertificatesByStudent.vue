<template>
  <div class="certificates-container mx-auto mt-5">
    <div class="d-flex align-center certificates-container__input">
      <v-text-field v-model="studentCode" label="Código estudiantil">
      </v-text-field>
      <v-btn small color="success" class="ml-6" @click="getStudentPlays()">
        Buscar obras
      </v-btn>
    </div>
    <div class="plays-container">
      <v-data-table :headers="headers" :items="plays" :loading="loading">
        <template #[`item.action`]="{ item }">
          <v-btn
            color="primary"
            :loading="certificateLoading"
            @click="generateCertificate(item)"
          >
            Generar certificado
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-snackbar v-model="showSnackbar" color="primary">
      No se encontraron obras para el código ingresado.
    </v-snackbar>
    <v-snackbar v-model="showSuccessSnackbar" color="success">
      Se ha enviado el certificado.
    </v-snackbar>
    <v-snackbar v-model="showErrorSnackbar" color="error">
      Ha ocurrido un error al enviar el certificado, por favor intente de nuevo
      más tarde.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'CertificatesByStudent',
  data: () => ({
    studentCode: '',
    plays: [],
    loading: false,
    certificateLoading: false,
    showSnackbar: false,
    showSuccessSnackbar: false,
    showErrorSnackbar: false,
    headers: [
      {
        text: 'Obra',
        value: 'title',
      },
      {
        text: 'Personaje',
        value: 'character',
      },
      {
        text: 'Acción',
        value: 'action',
      },
    ],
  }),
  methods: {
    async getStudentPlays() {
      if (this.studentCode) {
        this.loading = true
        const plays = await this.$axios.$get(
          `/student/${this.studentCode}/plays`
        )

        if (plays.length === 0) {
          this.showSnackbar = true
        }

        this.plays = plays
        this.loading = false
      }
    },
    async generateCertificate(play) {
      try {
        const codes = [play.studentCode]

        this.certificateLoading = true

        await this.$axios.$post(`/play/${play.playId}/certificates`, codes)
        this.showSuccessSnackbar = true
      } catch (e) {
        this.showErrorSnackbar = true
      }
      this.certificateLoading = false
    },
  },
}
</script>

<style scoped>
.certificates-container {
  max-width: 95%;
}

.certificates-container__input {
  max-width: 50%;
}
</style>
