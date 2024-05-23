<script setup lang="ts">
import RucherItem from '@/components/RucherItem.vue'
import { showModal } from '@/composables/useModal';
import { ruchersFetch, loadAllRucher } from '@/composables/useRucher';

loadAllRucher()
</script>

<template>
  <div class="main-content d-flex home-main-content">
    <div class="home-sub-title d-flex">
      <h1 class="font-bold font-size-h2">Rucher(s):</h1>
      <button class="btn-yellow outline-shadow" @click="showModal('rucher', 'add')">Ajouter +</button>
    </div>
    <div class="d-flex rucher-item-container">
      <rucher-item 
        v-for="rucher in ruchersFetch.data.value"
        v-bind="{
          id: rucher.idRucher,
          nbr: rucher.rucNumero,
          name: rucher.rucNom,
          localisation: rucher.rucLocalisation,
        }"
      ></rucher-item>
    </div>
  </div>
</template>

<style>
.home-main-content {
  flex-direction: column;
  align-items: stretch;
}
.home-sub-title {
  justify-content: space-between;
  margin: 2rem 0;
}
.rucher-item-container {
  flex-direction: column;
  align-items: stretch;
  margin: 2rem 0;
  gap: 4rem;
}
</style>
