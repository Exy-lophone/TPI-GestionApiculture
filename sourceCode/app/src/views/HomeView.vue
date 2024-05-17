<script setup lang="ts">
import { createFetchResult } from '@/composables/useFetch'
import { z } from 'zod';
import RucherItem from '@/components/RucherItem.vue'
import { BASE_URL, rucherParser, getToken } from '@/utils';

const parser = z.array(rucherParser)
const ruchers = createFetchResult<z.infer<typeof parser>>()
ruchers.load({
  url: BASE_URL+'/rucher',
  req: {
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  },
  parser
})
</script>

<template>
  <div class="main-content d-flex home-main-content">
    <div class="home-sub-title d-flex">
      <h1 class="font-bold font-size-h2">Rucher(s):</h1>
      <button class="btn-yellow outline-shadow">Ajouter +</button>
    </div>
    <div class="d-flex rucher-item-container">
      <rucher-item 
        v-for="rucher in ruchers.data.value"
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
