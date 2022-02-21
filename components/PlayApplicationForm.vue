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
          :min="minDate"
          :max="maxDate"
          locale="es-ES"
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
    minDate: '',
    maxDate: '',
    datePicker: false,
    dateRules: [
      (v) => new Date(v).getDay() !== 6 || 'No se puede audicionar un domingo',
    ],
  }),
  mounted() {
    this.getCharacters()

    this.minDate = new Date(this.convocation.startDate).toISOString()
    this.maxDate = new Date(this.convocation.endDate).toISOString()
  },
  methods: {
    async getCharacters() {
      const { data: characters } = await this.$axios.get(
        `/play/${this.play.playId}/characters`
      )
      this.characters = characters
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
