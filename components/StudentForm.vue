<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="docType"
            :items="docTypeItems"
            :rules="[(v) => !!v || 'El tipo de documento es requerido']"
            label="Tipo de documento"
            item-text="name"
            item-value="documentTypeId"
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="documentNumber"
            :rules="numberRules"
            label="Número de documento"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="names"
            :rules="nameRules"
            label="Nombres"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lasNames"
            :rules="nameRules"
            label="Apellidos"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="studentCode"
        :rules="numberRules"
        label="Código estudiantil"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="career"
        :items="careerItems"
        :rules="[(v) => !!v || 'La carrera es requerida']"
        label="Carrera"
        item-text="name"
        item-value="careerId"
        required
      ></v-select>

      <!-- Date picker -->
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Fecha de nacimiento"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          "
          min="1950-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="onSubmitForm"
      >
        Registrarse
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    docTypeItems: {
      type: Array,
      default: () => [],
    },
    careerItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    // Form Valid
    valid: true,

    // Inputs model form
    studentCode: '',
    documentNumber: '',
    names: '',
    lasNames: '',
    email: '',

    // Validation Rules Form
    numberRules: [
      (v) => !!v || 'El campo es requerido',
      (v) => /\d+/.test(v) || 'El campo debe de tener solo números',
    ],
    nameRules: [(v) => !!v || 'El nombre es requerido'],
    emailRules: [
      (v) => !!v || 'El email es requerido',
      (v) =>
        v.includes('@correo.udistrital.edu.co') ||
        'El correo debe ser un correo institucional',
    ],

    // DocType Select
    docType: null,
    // Career Select
    career: null,

    // Date Picker
    activePicker: null,
    date: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    onSubmitForm() {
      const user = {
        docNumber: this.documentNumber,
        documentTypeId: this.docType,
        names: this.names,
        lastName: this.lasNames,
        birthDate: this.date,
        email: this.email,
        code: this.studentCode,
        careerId: this.career,
      }
      this.$emit('createUser', user)
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
