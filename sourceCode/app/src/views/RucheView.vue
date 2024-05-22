<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { BASE_URL, rucheParser, activityParser, getToken } from '@/utils';
import ActivityList from '@/components/ActivityList.vue';

const route = useRoute()
const parser = z.array(activityParser)
const activities = createFetchResult<z.infer<typeof parser>>()
const ruche = createFetchResult<z.infer<typeof rucheParser>>()
ruche.load({
    url: BASE_URL+`/ruche/${route.params.id}`,
    req: {
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    },
    parser: rucheParser
})
activities.load({
    url: BASE_URL+`/ruche/${route.params.id}/activites`,
    req: {
        headers: {
            'Authorization': `bearer ${getToken()}` 
        }
    },
    parser
})
</script>

<template>
    <div class="main-content">
        <div class="ruche-info d-flex" v-if="!ruche.loading.value">
            <h4 class="font-size-h4 font-bold">Rucher: {{ ruche.data.value?.rucher.rucNom }}</h4>
            <h4 class="font-size-h4 font-bold">Numéro: {{ ruche.data.value?.rucNumero }}</h4>
            <h4 class="font-size-h4 font-bold">Couleur: {{ ruche.data.value?.couleur.couNom }}</h4>
            <div class="ruche-info-section">
                <h4 class="font-size-h4 font-bold">Reine:</h4>
                <ul>
                    <li class="font-size-h5 font-bold">Couleur: {{ ruche.data.value?.reine.couleur.couNom }}</li>
                    <li class="font-size-h5 font-bold">Naissance: {{ ruche.data.value?.reine.reiAnneNaissance }}</li>
                </ul>
            </div>
            <div class="ruche-info-section d-flex">
                <h4 class="font-size-h4 font-bold">Description:</h4>
                <p>{{  ruche.data.value?.rucDescription }}</p>
            </div>
            <button class="btn-yellow outline-shadow">Modifier</button>
        </div>
        <activity-list from="ruche"></activity-list>
    </div>
</template>

<style>
.ruche-info {
    align-items: start;
    flex-direction: column;
    gap: 2rem;
}
.ruche-info-section > ul {
    margin-top: 0.5rem;
    margin-left: 4rem;
}
.ruche-info-section {
    align-items: start;
    flex-direction: column;
    gap: 0.5rem;
}
</style>