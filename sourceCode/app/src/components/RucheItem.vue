<script setup lang="ts">

type RucheItemProps = {
    nbr: number
    color: string
}
const props = defineProps<RucheItemProps>()
</script>

<template>
    <div class="ruche-item d-flex outline-shadow">
        <div class="ruche-item-color" :style="{'background-color': `#${props.color}`}">&nbsp;</div>
        <div class="ruche-item-content d-flex">
            <p class="font-bold">#{{ props.nbr }}</p>
            <button class="btn-black">Détails</button>
        </div>
    </div>
</template>

<style>
.ruche-item {
    border-radius: 1rem;
    width: 20rem;
    background-color: var(--neutral-0);
    justify-content: start;
}
.ruche-item-color {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    align-self: stretch;
    width: 20%;
}
.ruche-item-content {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 80%;
    padding: 1rem 0;
    justify-content: space-evenly;
    gap: 1rem;
}
</style>