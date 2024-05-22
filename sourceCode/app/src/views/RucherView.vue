<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { BASE_URL, rucherParser, getToken } from '@/utils';
import { z } from 'zod';
import ActivityList from '@/components/ActivityList.vue';
import { showModal } from '@/composables/useModal';

const route = useRoute()
const rucher = createFetchResult<z.infer<typeof rucherParser>>()
rucher.load({
    url: BASE_URL+`/rucher/${route.params.id}`,
    req: {
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    },
    parser: rucherParser
})
</script>

<template>
    <div class="main-content">
        <div class="ruche-info d-flex" v-if="!rucher.loading.value">
            <h4 class="font-size-h4 font-bold">Nom: {{ rucher.data.value?.rucNom }}</h4>
            <h4 class="font-size-h4 font-bold">Numéro: {{ rucher.data.value?.rucNumero }}</h4>
            <h4 class="font-size-h4 font-bold">Localisation: {{ rucher.data.value?.rucLocalisation }}</h4>
            <button class="btn-yellow outline-shadow" @click="showModal('rucher', 'modify')">Modifier</button>
        </div>
        <activity-list from="rucher"></activity-list>
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