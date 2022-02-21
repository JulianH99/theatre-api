<template>
  <v-card>
    <v-card-title>
      <p>Aplicar a: {{ play.title }}</p>
    </v-card-title>
    <v-card-subtitle>
      <div v-if="student">
        <p>Por: {{ student.names }} {{ student.lastName }}</p>
        <p>Código: {{ student.code }}</p>
      </div>
    </v-card-subtitle>
    <v-card-text v-if="!applicationForm">
      <StudentCodeForm v-if="!registerForm" @searchUser="searchUser" />
      <StudentForm
        v-else
        :doc-type-items="docTypeItems"
        :career-items="careerItems"
        @createUser="createUser"
      />
      <v-snackbar v-model="notFound">
        El estudiante no fue encontrado. Por favor registrese
        <template #action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="notFound = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="errorCreatingStudent" color="red">
        El documento o código ingresado ya se encuentra registrado
      </v-snackbar>
    </v-card-text>
    <v-card-text v-else>
      <PlayApplicationForm
        :student="student"
        :convocation="convocation"
        :play="play"
        @endApplication="endApplication"
      />

      <v-snackbar v-model="applicationError" color="red">
        Ya ha realizado una aplicación a esta convocatoria
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    play: {
      type: Object,
      default: () => null,
    },
    convocation: {
      type: Object,
      default: () => null,
    },
  },
  data: () => ({
    // $axios: context.$axios,
    student: null,
    registerForm: false,
    docTypeItems: [],
    careerItems: [],
    notFound: false,
    applicationForm: false,
    applicationSubmitted: false,
    applicationError: false,
    errorCreatingStudent: false,
  }),
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      const { data: docType } = await this.$axios.get('/document-type')
      const { data: career } = await this.$axios.get('/career')

      this.docTypeItems = docType
      this.careerItems = career
    },
    async searchUser(studentCode) {
      try {
        const { data } = await this.$axios.get(`/student/${studentCode}`)
        this.student = data
        this.applicationForm = true
      } catch (e) {
        if (e.response.status === 404) {
          this.notFound = true
          this.registerForm = true
        }
      }
    },
    async createUser(user) {
      try {
        const res = await this.$axios.post('/student', user)
        this.student = res
        this.applicationForm = true
      } catch (e) {
        if (e.response.status === 422) {
          this.errorCreatingStudent = true
        }
      }
    },
    async endApplication(info) {
      try {
        await this.$axios.post(`/play/${this.play.playId}/convocation`, {
          ...info,
          code: this.student.code,
        })
        this.applicationSubmitted = true
        this.$emit('endApplication')
      } catch (e) {
        if (e.response.status === 400) {
          this.applicationError = true
        }
      }
    },
  },
}
</script>
