<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import ModalRucher from './components/ModalRucher.vue';
import ModalActivity from './components/ModalActivity.vue';
import ModalRuche from './components/ModalRuche.vue';
import { modals } from './composables/useModal';
import navbar from '@/components/Navbar.vue'
const router = useRouter();

</script>

<template>
  <modal-ruche v-if="modals.ruche.show"></modal-ruche>
  <modal-rucher v-if="modals.rucher.show" ></modal-rucher>
  <modal-activity v-if="modals.activity.show" ></modal-activity>
  <navbar v-if="router.currentRoute.value.name !== 'login'"></navbar>
  <div class="application-content">
    <RouterView />
  </div>
  <footer v-if="router.currentRoute.value.name !== 'login'" class="d-flex">
    <div class="footer-title d-flex">
      <h5 class="font-size-h5 font-bold">TPI - 2024</h5>
      <h6 class="font-size-h6 font-bold">Gestion des activités d'un apiculteur</h6>
    </div>
    <div class="footer-sections d-flex">
      <section class="footer-section d-flex">
        <h6 class="font-size-h6 font-bold footer-section-title">Candidat</h6>
        <p class="footer-section-content">Kevin Daddy Avdylaj</p>
      </section>
      <section class="footer-section d-flex">
        <h6 class="font-size-h6 font-bold footer-section-title">Chef de projet</h6>
        <p class="footer-section-content">Gaël Sonney</p>
      </section>
      <section class="footer-section d-flex">
        <h6 class="font-size-h6 font-bold footer-section-title">Experts</h6>
        <p class="footer-section-content">Nicolas Borboën et Pascal Benzonana </p>
      </section>
      <section class="footer-section d-flex">
        <h6 class="font-size-h6 font-bold footer-section-title">Lieu</h6>
        <p class="footer-section-content"><a class="font-bold" href="https://www.etml.ch/">ETML</a> Vennes</p>
      </section>
    </div>
  </footer>
</template>

<style scoped>
.application-content {
  max-width: 120rem;
  margin: auto;
  min-height: 100vh;
}
footer {
  background-color: var(--neutral-900);
  justify-content: space-between;
  padding: 0 10.625rem;
  height: 16rem;
  margin-top: 4rem;
}
footer p, h6, h5{
  color: var(--neutral-0);
}
footer a {
  color: #1D66F2;
}
.footer-title {
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}
.footer-sections {
  gap: 2rem;
}
.footer-section {
  flex-direction: column;
  align-items: start;
  border-left: 1px var(--neutral-0) solid;
  gap: 0.5rem;
  padding: 0.5rem 0 0.5rem 1rem;
}
</style>
