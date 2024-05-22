<script setup lang="ts">
import ActivityList from '@/components/ActivityList.vue';
import ArrowIcon from '@/components/ArrowIcon.vue';
import { ref } from 'vue';

const year = ref(2024)
const incrementYear = () => year.value++
const decrementYear = () => year.value--
</script>

<template>
    <div class="main-content">
        <div class="activity-title">
            <h2 class="font-size-h2 font-bold left">Activité(s):</h2>
            <div class="year-selector d-flex">
                <arrow-icon direction="left" @click="decrementYear()"></arrow-icon>
                <h3 class="font-size-h3 font-bold">{{ year }}</h3>
                <arrow-icon direction="right" @click="incrementYear()"></arrow-icon>
            </div>
        </div>
        <activity-list from="all" :year="year" :key="year"></activity-list>
    </div>
</template>

<style>
.left {
    grid-area: left;
}
.middle {
    grid-area: middle;
}
.right {
    grid-area: right;
}
.activity-title {
    display: grid;
    grid-template-areas: "left middle right";
    grid-template-columns: 1fr 1fr 1fr;
    margin: 4rem;
}
.year-selector {
    gap: 1rem;
}
</style>