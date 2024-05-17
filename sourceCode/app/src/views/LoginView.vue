<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createFetchResult } from '../composables/useFetch'
import { z } from 'zod'
import { loginParser } from '@/utils';
import { BASE_URL } from '@/utils';

const router = useRouter()
const auth = createFetchResult<z.infer<typeof loginParser>>()
const username = ref('')
const password = ref('')
const authentify = () => {
    auth.load({
        url: BASE_URL+'/auth/login',
        req: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username.value, password: password.value})
        },
        parser: loginParser
    }, 
    (x) => { 
        window.localStorage.setItem('token',x.token)
        router.push('/')
    });
}

</script>

<template>
    <main class="d-flex">
        <div class="login-leftside">
        </div>
        <div class="login-rightside d-flex">
            <h1 class="font-size-h1 font-bold font-italic">API-Culture</h1>
            <form @submit.prevent class="login-form d-flex">
                <p v-if="auth.error.value" style="color: var(--error-300);">Mauvais nom d'utilisateur ou mot de passe !</p>
                <div class="label-input d-flex">
                    <label class="font-size-h6 font-bold">Nom d'utilisateur</label>
                    <input v-model="username" type="text" placeholder="Nom d'utilisateur..." >
                </div>
                <div class="label-input d-flex">
                    <label class="font-size-h6 font-bold">Mot de passe</label>
                    <input v-model="password" type="password" placeholder="Mot de passe...">
                </div>
                <button class="btn-green" @click="authentify()">Se connecter</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
.login-leftside {
    width: 65%;
    height: 100vh;
}
.login-rightside {
    width: 35%;
    height: 100vh;
    background-color: var(--primary-300);
    flex-direction: column;
    gap: 4rem;
}
.login-form {
    flex-direction: column;
    gap: 4rem;
    width: 20rem;
    align-items: stretch;
}
.label-input {
    align-items: stretch;
    flex-direction: column;
    gap: 1rem;
}
</style>