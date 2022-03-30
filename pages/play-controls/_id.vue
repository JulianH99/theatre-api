<template>
  <v-card>
    <v-toolbar flat dark>
      <v-toolbar-title>Acciones para la obra: {{ play.title }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Asistencia
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lock </v-icon>
        Viaticos
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        Certificados
      </v-tab>

      <v-tab-item>
        <AssistanceTab
          v-if="assistanceAvailable.active"
          :active-play="assistanceAvailable.play"
        />
        <v-alert v-else class="mt-5 mx-3" type="warning">
          Funcionalidad inactiva
        </v-alert>
      </v-tab-item>
      <v-tab-item>
        <AllowanceList />
      </v-tab-item>
      <v-tab-item>
        <CertificatesTab v-if="certificatesAvailable" :play="play" />
        <v-alert v-else class="mt-5 mx-3" type="warning">
          Funcionalidad inactiva
        </v-alert>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import AssistanceTab from '@/components/AssistanceTab.vue'
import CertificatesTab from '@/components/CertificatesTab.vue'
export default {
  name: 'PlayControls',
  components: { AssistanceTab, CertificatesTab },

  data() {
    return {
      play: {},
      assistanceAvailable: {},
      certificatesAvailable: {},
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const playId = this.$route.params.id
      const play = await this.$axios.$get(`/play/${playId}`)

      const assistanceAvailable = await this.$axios.$get(
        `/tab/assistance/${playId}`
      )

      this.play = play
      this.assistanceAvailable = assistanceAvailable
      this.certificatesAvailable = play.state === 0
    },
  },
}
</script>

<style></style>
