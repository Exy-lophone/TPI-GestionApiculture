<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { z } from 'zod';

const route = useRoute()

const parser = z.object({
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
})

const ruche = createFetchResult<z.infer<typeof parser>>()
const token = window.localStorage.getItem('token')
ruche.load({
    url: `http://localhost:3000/ruche/${route.params.id}`,
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
</style>