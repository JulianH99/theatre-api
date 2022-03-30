<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>Por obra</v-tab>
      <v-tab>Por estudiante</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CertificatesByPlay :play="play" />
      </v-tab-item>
      <v-tab-item>
        <CertificatesByStudent />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CertificatesByPlay from '@/components/certificates/CertificatesByPlay.vue'
import CertificatesByStudent from '@/components/certificates/CertificatesByStudent.vue'

export default {
  name: 'CertificatesTab',
  components: { CertificatesByPlay, CertificatesByStudent },
  props: {
    play: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    tab: '',
  }),
}
</script>

<style></style>
