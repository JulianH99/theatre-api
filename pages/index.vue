<template>
  <div class="d-flex justify-center">
    <v-card elevation="24" outlined max-width="344">
      <v-card-text>
        <p class="text-h4 text--primary">Ingrese su Cedula de ciudadania</p>
        <v-text-field
          v-model="id_number"
          label="Numero C.C."
          hide-details="auto"
        ></v-text-field>
        <v-btn
          class="login-button"
          color="primary"
          elevation="2"
          large
          @click="loginAction()"
        >
          Ingresar
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      id_number: '',
    }
  },
  methods: {
    async loginAction() {
      try {
        const data = await this.$axios.$post('/login', { code: this.id_number })
        localStorage.setItem('userId', data.userId)
        this.$router.push('/play-list')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.login-button {
  margin-top: 10px;
}
</style>
