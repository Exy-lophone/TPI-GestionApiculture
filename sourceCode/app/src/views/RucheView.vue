<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { BASE_URL, rucheParser, activityParser, getToken } from '@/utils';
import ActivityItem from '@/components/ActivityItem.vue';

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
const getDateFromIsoDate = (isoDate: string) => {
    return isoDate.split('T')[0]
}
const getTimeFromIsoDate = (isoDate: string) => {
    const time = isoDate.split('T')[1].split(':')
    return time[0] + ':' + time[1]
}
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
        <div class="activity-list-title d-flex">
            <h3 class="font-size-h3 font-bold">Activité(s)</h3>
            <button class="btn-white outline-shadow">Ajouter +</button>
        </div>
        <div class="activity-list d-flex" v-if="ruche.data.value">
            <activity-item
                v-for="activity in activities.data.value"
                :key="activity.idActivite"
                v-bind="{
                    id: activity.idActivite,
                    category: activity.categorie.catNom,
                    date: getDateFromIsoDate(activity.actDate),
                    time: getTimeFromIsoDate(activity.actDuree),
                    nbRuche: ruche.data.value.rucNumero,
                    description: activity.actDescription
                }"
            ></activity-item>
        </div>
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
.activity-list-title {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
}
.activity-list {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
    align-items: stretch;
}
</style>