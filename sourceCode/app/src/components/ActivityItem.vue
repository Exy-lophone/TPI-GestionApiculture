<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { deleteActivityById, loadAllActivities, loadAllActivitiesByRucheId, loadAllActivitiesByRucherId, year } from '@/composables/useActivity';
import TrashIcon from './TrashIcon.vue';
import ArrowIcon from './ArrowIcon.vue';
import { ref } from 'vue';
import { z } from 'zod';
import { currentActivity, showModal } from '@/composables/useModal';

type ActivityItemProps = {
    id: number,
    category: { id: number, name: string },
    date: string,
    time: string,
    ruche: { id: number, number: number }
    description: string
}

const route = useRoute()
const props = defineProps<ActivityItemProps>()
const showDescription = ref(false)
const toggleShowDescription = () => showDescription.value = !showDescription.value

const deleteActivity = (id: number) => {
    if(route.name === 'activity') {
        deleteActivityById(id).then(() => 
            loadAllActivities(year.value)
        )
    }
    else if(route.name === 'ruche') {
        deleteActivityById(id).then(() =>
            loadAllActivitiesByRucheId(z.coerce.number().parse(route.params.id))
        )
    }
    else if(route.name === 'rucher') {
        deleteActivityById(id).then(() =>
            loadAllActivitiesByRucherId(z.coerce.number().parse(route.params.id))
        )
    }
}

const showActivityModal = () => {
    currentActivity.value = {
        idActivite: props.id,
        actDate: props.date,
        actDuree: props.time,
        actDescription: props.description,
        categorie: {
            idCategorie: props.category.id,
            catNom: props.category.name
        }
    }
    showModal('activity', 'modify')
}

</script>

<template>
    <div class="activity-item-section d-flex">
        <div class="activity-item d-flex outline-shadow">
            <p class="font-bold">{{ props.category.name }}</p>
            <p class="font-bold">{{ props.date }}</p>
            <p class="font-bold">{{ props.time }}</p>
            <router-link :to="{path: `/ruche/${props.ruche.id}`}" class="activity-link font-bold">Ruche numéro: {{ props.ruche.number }}°</router-link>
            <div class="activity-item-btns d-flex">
                <button class="btn-black" @click="showActivityModal()">Modifier</button>
                <button class="btn-red" @click="deleteActivity(props.id)"><trash-icon></trash-icon></button>
                <arrow-icon direction="down" @click="toggleShowDescription"></arrow-icon>
            </div>
        </div>
        <div v-if="showDescription" class="activity-item-description">
            <p class="font-bold">Description:</p>
            <p>{{ props.description }}</p>
        </div>
    </div>
</template>

<style>
.activity-item-description {
    margin: 0 2rem;
}
.activity-item-section {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
}
.activity-item {
    align-self: stretch;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-radius: 1rem;
}
.activity-link {
    color: var(--primary-300);
    text-decoration: underline;
}
.activity-item-btns {
    gap: 1rem;
}
</style>