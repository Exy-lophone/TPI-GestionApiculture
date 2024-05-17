<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import navbar from '@/components/Navbar.vue'

const router = useRouter();
</script>

<template>
  <navbar v-if="router.currentRoute.value.name !== 'login'"></navbar>
  <div class="application-content">
    <RouterView />
  </div>
</template>

<style scoped>
.application-content {
  max-width: 120rem;
  margin: auto;
}
</style>
