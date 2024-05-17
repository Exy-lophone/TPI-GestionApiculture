<script setup lang="ts">
import { z } from 'zod';
import ArrowIcon from './ArrowIcon.vue';
import TrashIcon from './TrashIcon.vue';
import RucheItem from './RucheItem.vue';
import { createFetchResult } from '@/composables/useFetch';

export type RucherItemProps = {
    id: number,
    nbr: number,
    name: string,
    localisation: string,
}

const props = defineProps<RucherItemProps>()

const parser = z.array(z.object({
    idRuche: z.number(),
    rucNumero: z.number(),
    rucDescription: z.string(),
    reine: z.object({
        couleur: z.object({
            idCouleur: z.number(),
            couNom: z.string(),
            couCodeHex: z.string(),
        }),
        idReine: z.number(),
        reiAnneNaissance: z.number(),
    }),
    rucher: z.object({
        idRucher: z.number(),
        rucNumero: z.number(),
        rucNom: z.string(),
        rucLocalisation: z.string(),
        fkApiculteur: z.number(),
    }),
    couleur: z.object({
        idCouleur: z.number(),
        couNom: z.string(),
        couCodeHex: z.string(),
    })
}))

const ruches = createFetchResult<z.infer<typeof parser>>()
const token = window.localStorage.getItem('token')
ruches.load({
    url: `http://localhost:3000/rucher/${props.id}/ruches`,
    req: {
        headers: {
            'Authorization': `bearer ${token}`
        }
    },
    parser
})
</script>

<template>
    <div class="rucher-item-section d-flex">
        <div class="d-flex rucher-item">
            <p class="font-bold">#{{ props.nbr }}</p>
            <p class="font-bold">Nom: {{ props.name }}</p>
            <p class="font-bold">Localisation: {{ props.localisation }}</p>
            <div class="rucher-item-btns d-flex">
                <button class="btn-black">Détails</button>
                <button class="btn-red"><trash-icon></trash-icon></button>
                <arrow-icon direction="down"></arrow-icon>
            </div>
        </div>
        <div class="ruche-item-container d-flex inner-shadow">
            <ruche-item v-for="ruche in ruches.data.value" :nbr="ruche.rucNumero" :color="ruche.couleur.couCodeHex"></ruche-item>
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