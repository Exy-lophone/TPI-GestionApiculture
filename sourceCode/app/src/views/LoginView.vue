<template>
    <main class="d-flex">
        <div class="login-leftside"></div>
        <div class="login-rightside d-flex">
            <h1 class="font-size-h1 font-bold font-italic">API-Culture</h1>
            <form class="login-form d-flex">
                <div class="label-input d-flex">
                    <label class="font-size-h6 font-bold">Nom d'utilisateur</label>
                    <input type="text" placeholder="Nom d'utilisateur..." >
                </div>
                <div class="label-input d-flex">
                    <label class="font-size-h6 font-bold">Mot de passe</label>
                    <input type="password" placeholder="Mot de passe...">
                </div>
                <button class="btn-green">Se connecter</button>
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