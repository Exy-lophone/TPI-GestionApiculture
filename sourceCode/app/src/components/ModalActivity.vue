<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { modals, closeModal, currentActivity } from '@/composables/useModal';
import { updateRucher, createRucher } from '@/composables/useRucher';
import { currentRucher } from '@/composables/useModal';
import { getUserId } from '@/utils';
import { onMounted, ref } from 'vue';
import { z } from 'zod';

const date = ref('')
const duree = ref('')
const description = ref('')

const getTitle = () => {
    switch (modals.rucher.mode) {
        case 'add': return 'Ajouter'
        case 'modify': return 'Modifier'
    }
}

const create = () => {
    closeModal('activity')
}

const update = () => {
    if(!currentActivity.value) {
        console.error('[ModalActivity] currentActivity is null')
        return
    }

    closeModal('activity')
}

const validate = () => {
    switch (modals.rucher.mode) {
        case 'add': create(); break
        case 'modify': update(); break
    }
}

onMounted(() => {

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
                <label class="font-bold">Catégorie:</label>
                <input id="modal-activity-input" type="text" placeholder="Catégorie"></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Date:</label>
                <input id="modal-activity-input" v-model="date" type="text" placeholder="DD/MM/YYYY" ></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Duree:</label>
                <input id="modal-activity-input" v-model="duree" type="text" placeholder="HH:MM"></input>
            </div>
        </div>
        <div class="modal-body-row stretch d-flex">
            <div class="modal-label-input-column d-flex">
                <label class="font-bold">Description:</label>
                <textarea v-model="description" placeholder="description..."></textarea>
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
.stretch {
    justify-content: stretch;
    align-items: stretch;
}
.modal-label-input-column {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
}

#modal-activity-input {
    width: 20ch;
}
</style>