<script setup lang="ts">
export type ArrowProps = {
    direction: "down" | "up" | "left" | "right"
    stroke?: string
}

const props = withDefaults(defineProps<ArrowProps>(), {
    stroke: 'black'
})

</script>

<template>
    <svg v-if="direction === 'down'" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L13 1" :stroke stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else-if="direction === 'up'" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7L7 1L1 7" :stroke stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else-if="direction === 'left'" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1.5L1 7.5L7 13.5" :stroke stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else-if="direction === 'right'" width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13.5L7 7.5L1 1.5" :stroke stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>