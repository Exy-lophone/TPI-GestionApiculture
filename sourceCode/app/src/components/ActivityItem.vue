<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TrashIcon from './TrashIcon.vue';
import ArrowIcon from './ArrowIcon.vue';
import { ref } from 'vue';

type ActivityItemProps = {
    id: number,
    category: string,
    date: string,
    time: string,
    nbRuche: number,
    description: string
}

const props = defineProps<ActivityItemProps>()
const showDescription = ref(false)
const toggleShowDescription = () => showDescription.value = !showDescription.value
</script>

<template>
    <div class="activity-item-section d-flex">
        <div class="activity-item d-flex outline-shadow">
            <p class="font-bold">{{ props.category }}</p>
            <p class="font-bold">{{ props.date }}</p>
            <p class="font-bold">{{ props.time }}</p>
            <router-link :to="{path: `/ruche/${props.nbRuche}`}" class="activity-link font-bold">Ruche numéro: {{ props.nbRuche }}°</router-link>
            <div class="activity-item-btns d-flex">
                <button class="btn-black">Modifier</button>
                <button class="btn-red"><trash-icon></trash-icon></button>
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