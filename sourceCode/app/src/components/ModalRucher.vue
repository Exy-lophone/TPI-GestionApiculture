<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { modals, closeModal } from '@/composables/useModal';
import { updateRucher, createRucher } from '@/composables/useRucher';
import { currentRucher } from '@/composables/useModal';
import { getUserId } from '@/utils';
import { onMounted, ref } from 'vue';
import { z } from 'zod';

const getTitle = () => {
    switch (modals.rucher.mode) {
        case 'add': return 'Ajouter'
        case 'modify': return 'Modifier'
    }
}

const nbr = ref('')
const name = ref('')
const localisation = ref('')

const create = () => {
    createRucher({
        idRucher: 1,
        rucNumero: z.coerce.number().parse(nbr.value),
        rucNom: name.value,
        rucLocalisation: localisation.value,
        fkApiculteur: z.coerce.number().parse(getUserId()),
    })
    closeModal('rucher')
}

const update = () => {
    if(!currentRucher.value) {
        console.error('[ModalRucher] currentRucher is null')
        return
    }
    updateRucher({
        idRucher: currentRucher.value.idRucher,
        rucNumero: z.coerce.number().parse(nbr.value),
        rucNom: name.value,
        rucLocalisation: localisation.value,
        fkApiculteur: z.coerce.number().parse(getUserId()),
    })
    closeModal('rucher')
}

const validate = () => {
    switch (modals.rucher.mode) {
        case 'add': create(); break
        case 'modify': update(); break
    }
}

onMounted(() => {
    if(modals.rucher.mode === 'modify') {
        nbr.value = currentRucher.value?.rucNumero ? `${currentRucher.value.rucNumero}` : ''
        name.value = currentRucher.value?.rucNom ? currentRucher.value.rucNom : ''
        localisation.value = currentRucher.value?.rucLocalisation ? currentRucher.value.rucLocalisation : ''
    }
})
</script>

<template>
    <modal 
        :title="getTitle()" 
        @validated="validate()" 
        @canceled="closeModal('rucher')" 
        @background-clicked="closeModal('rucher')"
    >
        <div class="modal-body-row d-flex">
            <div class="modal-label-input d-flex">
                <label class="font-bold">Numéro:</label>
                <input id="modal-rucher-input-nbr" v-model="nbr" type="text" placeholder="Numéro"></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Nom:</label>
                <input id="modal-rucher-input-name" v-model="name" type="text" placeholder="Nom" ></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Localisation:</label>
                <input id="modal-rucher-input-loc" v-model="localisation" type="text" placeholder="localisation"></input>
            </div>
        </div>
    </modal>
</template>

<style>
.modal-body-row {
    gap: 2rem;
    padding: 1rem 2rem;
}
.modal-label-input {
    gap: 1rem;
}

#modal-rucher-input-nbr {
    width: 10ch;
}

#modal-rucher-input-name {
    width: 20ch;
}

#modal-rucher-input-loc {
    width: 40ch;
}
</style>