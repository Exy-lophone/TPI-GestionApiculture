<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { modals, closeModal } from '@/composables/useModal'
import { ref } from 'vue';
const getTitle = () => {
    switch (modals.rucher.mode) {
        case 'add': return 'Ajouter'
        case 'modify': return 'Modifier'
    }
}

const nbr = ref('')
const name = ref('')
const localisation = ref('')


</script>

<template>
    <modal :title="getTitle()" v-if="modals.rucher.show" @canceled="closeModal('rucher')" @background-clicked="closeModal('rucher')">
        <div class="modal-body-row d-flex">
            <div class="modal-label-input d-flex">
                <label class="font-bold">Numéro:</label>
                <input id="modal-rucher-input-nbr" v-model="nbr" type="text" placeholder="Numéro"></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Nom:</label>
                <input id="modal-rucher-input-name" v-model="name" type="text" placeholder="Nom"></input>
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