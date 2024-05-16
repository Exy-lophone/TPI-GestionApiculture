<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import { createFetchObj, type FetchResult} from '../composables/useFetch'
import { z } from 'zod'

const parser = z.object({
    token: z.string()
})

const auth = createFetchObj<z.infer<typeof parser>>()
const username = ref('')
const password = ref('')

const authentify = () => {
    auth.load({
        url: 'http://localhost:3000/auth/login',
        req: {
            method: 'POST',
            body: JSON.stringify({username: username.value, password: password.value})
        },
        parser
    });
}

</script>

<template>
    <main class="d-flex">
        <div class="login-leftside">
            <p>{{ auth }}</p>
        </div>
        <div class="login-rightside d-flex">
            <h1 class="font-size-h1 font-bold font-italic">API-Culture</h1>
            <form @submit.prevent class="login-form d-flex">
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