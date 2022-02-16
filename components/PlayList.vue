<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-list-item v-for="play in plays" :key="play.playId" two-line>
      <v-list-item-content>
        <v-list-item-title>{{ play.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ play.writer }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          class="ma-2"
          :loading="loading2"
          :disabled="loading2"
          color="success"
          @click="loader = 'loading2'"
        >
          Apply
          <template v-slot:loader>
            <span>Loading...</span>
          </template>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ['plays'],
}
</script>
