<script setup lang="ts">
export type TrashIconProps = {
    width?: number,
    height?: number,
    color?: string
}

const props = withDefaults(defineProps<TrashIconProps>(),{
    width: 15,
    height: 19,
    color: 'var(--neutral-0)'
})
</script>

<template>
    <svg :width :height viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :style="{fill: color}" d="M1.16664 16.8889C1.16664 18.05 2.11664 19 3.27775 19H11.7222C12.8833 19 13.8333 18.05 13.8333 16.8889V4.22222H1.16664V16.8889ZM3.27775 6.33333H11.7222V16.8889H3.27775V6.33333ZM11.1944 1.05556L10.1389 0H4.86108L3.80553 1.05556H0.111084V3.16667H14.8889V1.05556H11.1944Z" fill="white"/>
    </svg>
</template>