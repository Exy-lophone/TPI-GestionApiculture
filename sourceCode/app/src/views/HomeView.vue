<script setup lang="ts">
import { createFetchResult } from '@/composables/useFetch'
import { z } from 'zod';
import RucherItem from '@/components/RucherItem.vue'

const parser = z.array(z.object({
  idRucher: z.number(),
  rucNumero: z.number(),
  rucNom: z.string(),
  rucLocalisation: z.string(),
  fkApiculteur: z.number()
}))
const ruchers = createFetchResult()
const token = window.localStorage.getItem('token')
ruchers.load({
  url: 'http://localhost:3000/rucher',
  req: {
    headers: {
      'Authorization': `bearer ${token}`
    }
  },
  parser
})

</script>

<template>
  <div class="main-content">
    <div class="home-sub-title d-flex">
      <h1 class="font-bold font-size-h2">Rucher(s):</h1>
      <button class="btn-yellow outline-shadow">Ajouter +</button>
    </div>
    <div class="d-flex rucher-item-container">
      <p>{{ ruchers }}</p>
      <rucher-item></rucher-item>
    </div>
  </div>
</template>

<style>
.home-sub-title {
  justify-content: space-between;
}
</style>
