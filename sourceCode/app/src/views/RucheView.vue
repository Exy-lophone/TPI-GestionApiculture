<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { BASE_URL, rucheParser, activityParser, getToken } from '@/utils';
import ActivityList from '@/components/ActivityList.vue';
import { currentRuche, showModal } from '@/composables/useModal';
import { rucheDetailFetch, loadRucheDetailById} from '@/composables/useRuche';

const route = useRoute()
loadRucheDetailById(z.coerce.number().parse(route.params.id))

const showRucheModal = () => {
    if(!rucheDetailFetch.data.value) {
        console.error('[RucheView] rucheDetailFetch.data.value is null')
        return
    }
    const ruche = rucheDetailFetch.data.value
    currentRuche.value = {
        id: ruche.idRuche,
        nbr: ruche.rucNumero,
        description: ruche.rucDescription,
        fkCouleur: ruche.couleur.idCouleur,
        fkReine: ruche.reine.idReine,
        fkRucher: ruche.rucher.idRucher
    }
    showModal('ruche','modify')
}
</script>

<template>
    <div class="main-content">
        <div class="ruche-info d-flex" v-if="!rucheDetailFetch.loading.value">
            <h4 class="font-size-h4 font-bold">Rucher: {{ rucheDetailFetch.data.value?.rucher.rucNom }}</h4>
            <h4 class="font-size-h4 font-bold">Numéro: {{ rucheDetailFetch.data.value?.rucNumero }}</h4>
            <h4 class="font-size-h4 font-bold">Couleur: {{ rucheDetailFetch.data.value?.couleur.couNom }}</h4>
            <div class="ruche-info-section">
                <h4 class="font-size-h4 font-bold">Reine:</h4>
                <ul>
                    <li class="font-size-h5 font-bold">Couleur: {{ rucheDetailFetch.data.value?.reine.couleur.couNom }}</li>
                    <li class="font-size-h5 font-bold">Naissance: {{ rucheDetailFetch.data.value?.reine.reiAnneNaissance }}</li>
                </ul>
            </div>
            <div class="ruche-info-section d-flex">
                <h4 class="font-size-h4 font-bold">Description:</h4>
                <p>{{ rucheDetailFetch.data.value?.rucDescription }}</p>
            </div>
            <button class="btn-yellow outline-shadow" @click="showRucheModal()">Modifier</button>
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