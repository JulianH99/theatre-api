<template>
  <div>
    <StudentCodeForm v-if="!register_form" :searchUser="searchUser" />
    <StudentForm
      v-else
      :createUser="createUser"
      :docTypeItems="docTypeItems"
      :careerItems="careerItems"
    />
  </div>
</template>

<script>
export default {
  data: (context) => ({
    $axios: context.$axios,
    student: {},
    register_form: false,
    docTypeItems: [],
    careerItems: [],
  }),
  async asyncData(context) {
    const docType = await context.$axios.get('/document-type');
    const career = await context.$axios.get('/career');
    return {
      docTypeItems: docType.data,
      careerItems: career.data,
    }
  },
  methods: {
    searchUser(studentCode) {
      this.student = this.$axios
        .get(`/student/${studentCode}`)
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          console.log(error)
          this.register_form = true
        })
    },
    createUser(user) {
      this.$axios
        .post('/student', user)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>