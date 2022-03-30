<template>
  <div>
    <v-data-table :headers="headers" :items="students" class="elevation-1">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.code }}</td>
          <td>{{ row.item.full_name }}</td>
          <td>
            <v-btn elevation="2" color="success" @click="seeDetails(row.item)"
              >Ver</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Actividades de {{ active_student.full_name }}
        </v-card-title>

        <v-card-text>
          <v-list-item two-line v-for="(item, index) in active_student.asistance" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{item.type}} in theater {{item.theater}}</v-list-item-title>
              <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{item.start_time}} - {{item.end_time}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AllowanceList',
  data() {
    return {
      dialog: false,
      active_student: {},
      headers: [
        { text: 'Codigo', value: 'code' },
        { text: 'Nobre', value: 'full_name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      students: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const playId = this.$route.params.id
      const resStudents = await this.$axios.get(`/allowance/${playId}/students`)
      this.students = resStudents.data
    },
    seeDetails(student) {
      this.active_student = student
      this.dialog = true
    },
  },
}
</script>

<style>
</style>