<template>
  <div>
    <div>
      <v-select
        v-model="selectedCharacter"
        :items="characters"
        label="Personaje"
        item-text="name"
        item-value="playCharacterId"
      >
      </v-select>
    </div>
    <div>
      <v-menu
        v-model="datePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="selectedDate"
            label="Fecha de audición"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :rules="dateRules"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="selectedDate"
          locale="es-ES"
          :allowed-dates="allowedDates"
          @input="datePicker = false"
        ></v-date-picker>
      </v-menu>
    </div>
    <v-btn color="info" class="mt-6" @click="endApplication"
      >Finalizar aplicación</v-btn
    >
  </div>
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
    characters: [],
    selectedCharacter: 0,
    selectedDate: null,
    availableDates: [],
    datePicker: false,
    dateRules: [
      (v) => new Date(v).getDay() !== 6 || 'No se puede audicionar un domingo',
    ],
  }),
  mounted() {
    this.getCharacters()
    this.getAvailableDates()
  },
  methods: {
    async getCharacters() {
      const { data: characters } = await this.$axios.get(
        `/play/${this.play.playId}/characters`
      )
      this.characters = characters
    },
    async getAvailableDates() {
      const { data: availableDates } = await this.$axios.get(
        `/convocation/${this.convocation.id}/dates`
      )

      this.availableDates = availableDates
    },
    allowedDates(v) {
      return this.availableDates.includes(v)
    },
    endApplication() {
      this.$emit('endApplication', {
        character: this.selectedCharacter,
        date: this.selectedDate,
      })
    },
  },
}
</script>
