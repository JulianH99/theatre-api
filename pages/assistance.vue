<template>
  <div>
    <p>Tab asistencia</p>

    <div v-if="activePlay && activePlay.title">
      <h2 class="text-h1">{{ activePlay.title }}</h2>

      <h3 class="text-h3 mt-9">Lista de estudiantes</h3>
      <v-data-table
        v-if="students.length > 0"
        class="mt-3"
        :headers="headers"
        :items="students"
      >
        <template #[`item.assistance`]="{ item }">
          <v-simple-checkbox v-model="item.assistance"> </v-simple-checkbox>
        </template>
      </v-data-table>

      <v-alert v-else class="mt-3" type="error" color="red"
        >No hay estudiantes registrados en esta obra</v-alert
      >

      <div class="d-flex justify-end mt-6">
        <v-btn depressed color="green" @click="saveAssistance">
          Registrar asistencia
        </v-btn>
      </div>
    </div>

    <div v-else>
      <h1 class="h1">No hay una obra activa</h1>
    </div>
    <v-snackbar v-model="showSuccessSnackbar" color="success">
      La asistencia se ha registrado correctamente
    </v-snackbar>
    <v-snackbar v-model="showErrorSnackbar" color="error">
      Error al registrar la asistencia
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'AssistanceTab',
  data: () => ({
    activePlay: {},
    showSuccessSnackbar: false,
    showErrorSnackbar: false,
    students: [],
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
        text: 'Asistencia',
        value: 'assistance',
      },
    ],
  }),
  mounted() {
    this.fetchActivePlay()
  },
  methods: {
    async fetchActivePlay() {
      const activePlay = await this.$axios.$get('/tab/assistance', {
        headers: {
          'X-User-Id': 1,
        },
      })
      this.activePlay = activePlay.play

      const students = await this.$axios.$get(
        `/play/${this.activePlay.playId}/event/${this.activePlay.playEventId}/students`,
        {
          headers: {
            'X-User-Id': 1,
          },
        }
      )
      this.students = students.map((st) => ({
        ...st,
        assistance: !!st.assistance,
      }))
    },
    async saveAssistance() {
      const studentsWithAssistance = this.students
        .filter((student) => student.assistance)
        .map((student) => student.code.trim())

      try {
        await this.$axios.$post(
          `/play/${this.activePlay.playId}/event/${this.activePlay.playEventId}/assistance`,
          studentsWithAssistance,
          {
            headers: {
              'X-User-Id': 1,
            },
          }
        )
        this.showSuccessSnackbar = true
      } catch {
        this.showErrorSnackbar = true
      }
    },
  },
}
</script>
