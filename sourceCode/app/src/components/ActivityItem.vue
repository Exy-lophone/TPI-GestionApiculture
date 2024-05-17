<script setup lang="ts">
import { RouterLink } from 'vue-router'

type ActivityItemProps = {
    id: number,
    category: string,
    date: string,
    time: string,
    nbRuche: number,
    description: string
}
const props = defineProps<ActivityItemProps>()
</script>

<template>
    <div class="activity-item d-flex outline-shadow">
        <p class="font-bold">{{ props.category }}</p>
        <p class="font-bold">{{ props.date }}</p>
        <p class="font-bold">{{ props.time }}</p>
        <router-link :to="{path: `/ruche/${props.nbRuche}`}" class="activity-link font-bold">Ruche: {{ props.nbRuche }}</router-link>
    </div>
</template>

<style>
.activity-item {
    justify-content: space-between;
}
.activity-link {
    color: var(--primary-300);
    text-decoration: underline;
}
</style>