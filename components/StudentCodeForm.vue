<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="studentCode"
      :rules="rules"
      label="Código estudiantil"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="$emit('searchUser', studentCode)"
    >
      Aplicar
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    student: {},
    studentCode: '',
    rules: [
      (v) => !!v || 'El código es requerido',
      (v) => /\d+/.test(v) || 'El código debe de tener solo números',
    ],
  }),
  methods: {
    onSubmitForm() {
      this.searchUser(this.studentCode)
    },
  },
}
</script>
