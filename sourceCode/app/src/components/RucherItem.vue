<script setup lang="ts">
import { z } from 'zod';
import ArrowIcon from './ArrowIcon.vue';
import TrashIcon from './TrashIcon.vue';
import RucheItem from './RucheItem.vue';
import { createFetchResult } from '@/composables/useFetch';
import { BASE_URL, rucheParser, getToken } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export type RucherItemProps = {
    id: number,
    nbr: number,
    name: string,
    localisation: string,
}

const router = useRouter()
const props = defineProps<RucherItemProps>()
const showRuche = ref(false);
const parser = z.array(rucheParser)
const ruches = createFetchResult<z.infer<typeof parser>>()
ruches.load({
    url: BASE_URL+`/rucher/${props.id}/ruches`,
    req: {
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    },
    parser
})
const toggleShowRuche = () => {
    showRuche.value = !showRuche.value
}
</script>

<template>
    <div class="rucher-item-section d-flex">
        <div class="d-flex rucher-item">
            <p class="font-bold">#{{ props.nbr }}</p>
            <p class="font-bold">Nom: {{ props.name }}</p>
            <p class="font-bold">Localisation: {{ props.localisation }}</p>
            <div class="rucher-item-btns d-flex">
                <button class="btn-black" @click="router.push(`/rucher/${props.id}`)">Détails</button>
                <button class="btn-red"><trash-icon></trash-icon></button>
                <arrow-icon direction="down" @click="toggleShowRuche()"></arrow-icon>
            </div>
        </div>
        <div v-if="showRuche" class="ruche-item-container d-flex inner-shadow">
            <ruche-item 
                v-for="ruche in ruches.data.value"
                v-bind="{
                    nbr: ruche.rucNumero,
                    color: ruche.couleur.couCodeHex,
                    id: ruche.idRuche
                }"
            ></ruche-item>
        </div>
    </div>
</template>

<style>
.rucher-item-section {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
}
.rucher-item {
    justify-content: space-between;
    background-color: var(--primary-300);
    padding-left: 8rem;
    padding-right: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 1rem;
}
.rucher-item-btns {
    gap: 2rem;
}
.ruche-item-container {
    background-color: var(--neutral-40);
    margin: 0 4rem;
    border-radius: 1rem;
    padding: 2rem 2rem;
    gap: 2rem;
}
</style>