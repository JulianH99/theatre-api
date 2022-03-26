<template>
  <div>
    <p>Tab certificados</p>

    <v-tabs v-model="tab">
      <v-tab>Por obra</v-tab>
      <v-tab>Por estudiante</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CertificatesByPlay />
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
  data: () => ({
    tab: '',
  }),
}
</script>

<style></style>
