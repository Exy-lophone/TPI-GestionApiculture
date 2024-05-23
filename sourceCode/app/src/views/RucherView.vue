<script setup lang="ts">
import { useRoute } from 'vue-router';
import { loadRucherDetailById, rucherDetailFetch } from '@/composables/useRucher';
import ActivityList from '@/components/ActivityList.vue';
import { currentRucher, showModal } from '@/composables/useModal';
import { z } from 'zod';

const route = useRoute()
loadRucherDetailById(z.coerce.number().parse(route.params.id))

const modify = () => {
    currentRucher.value = rucherDetailFetch.data.value
    showModal('rucher', 'modify')
}

</script>

<template>
    <div class="main-content">
        <div class="ruche-info d-flex" v-if="rucherDetailFetch.data.value">
            <h4 class="font-size-h4 font-bold">Nom: {{ rucherDetailFetch.data.value.rucNom }}</h4>
            <h4 class="font-size-h4 font-bold">Numéro: {{ rucherDetailFetch.data.value.rucNumero }}</h4>
            <h4 class="font-size-h4 font-bold">Localisation: {{ rucherDetailFetch.data.value.rucLocalisation }}</h4>
            <button class="btn-yellow outline-shadow" @click="modify()">Modifier</button>
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