<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="studentCode"
      :rules="rules"
      label="Student Code"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="onSubmitForm"
    >
      Validate
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
      (v) => !!v || 'Code is required',
      (v) => /\d+/.test(v) || 'The code is only a numbers',
    ],
  }),
  props: ['searchUser'],
  methods: {
    onSubmitForm() {
      this.$props.searchUser(this.studentCode)
    },
  },
}
</script>