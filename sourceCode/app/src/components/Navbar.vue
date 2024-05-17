<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()

function logout () {
    window.localStorage.removeItem('token')
    router.push('/login')
}
</script>

<template>
    <nav class="outline-shadow">
        <div class="nav-content d-flex">
            <h1 class="font-size-h1 font-bold font-italic" style="color: var(--primary-300)">API-Culture</h1>
            <div class="nav-links d-flex">
                <router-link to="/" class="font-bold">Rucher</router-link>
                <router-link to="/activity" class="font-bold">Activités</router-link>
                <button class="btn-black" @click="logout()">Logout</button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    margin-bottom: 4rem;
}
.nav-content {
    max-width: 120rem;
    margin: auto;
    justify-content: space-between;
    padding: 2rem 4rem;
}
.nav-links {
    gap: 2rem
}
.router-link-active {
    color: var(--primary-300);
}
</style>