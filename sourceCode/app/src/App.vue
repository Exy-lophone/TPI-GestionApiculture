<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import navbar from '@/components/Navbar.vue'

const router = useRouter();
</script>

<template>
  <navbar v-if="router.currentRoute.value.name !== 'login'"></navbar>
  <RouterView />
</template>

<style scoped>

</style>
