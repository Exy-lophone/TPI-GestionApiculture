<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { modals, closeModal, currentActivity } from '@/composables/useModal';
import { categoriesFetch } from '@/composables/useCategories';
import { createCategoryOnRucher, createCategoryOnRuche, loadAllActivitiesByRucheId, loadAllActivitiesByRucherId } from '@/composables/useActivity';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { z } from 'zod';
import Dropdown from './Dropdown.vue';
import { type DropDownItem } from './Dropdown.vue';

const route = useRoute()
const date = ref('')
const duree = ref('')
const description = ref('')
let selected: DropDownItem = { display: 'catégorie', value: '' }
let selectable: DropDownItem[] = []

if(categoriesFetch.data.value) {
    selectable = categoriesFetch.data.value.map(x => ({display: x.catNom, value: `${x.idCategorie}`}))
}

const getTitle = () => {
    switch (modals.activity.mode) {
        case 'add': return 'Ajouter'
        case 'modify': return 'Modifier'
    }
}

const create = () => {
    if(route.name === 'ruche') {
        createCategoryOnRuche(
            description.value,
            `${date.value}T${duree.value}:00Z`,
            z.coerce.number().parse(selected.value),
            z.coerce.number().parse(route.params.id)
        ).then(
            () => loadAllActivitiesByRucheId(z.coerce.number().parse(route.params.id))
        )
    }
    if(route.name === 'rucher') {
        createCategoryOnRucher(
            description.value,
            `${date.value}T${duree.value}:00Z`,
            z.coerce.number().parse(selected.value),
            z.coerce.number().parse(route.params.id)
        ).then(
            () => loadAllActivitiesByRucherId(z.coerce.number().parse(route.params.id))
        )
    }
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
    switch (modals.activity.mode) {
        case 'add': create(); break
        case 'modify': update(); break
    }
}
</script>

<template>
    <modal 
        :title="getTitle()" 
        @validated="validate()" 
        @canceled="closeModal('activity')" 
        @background-clicked="closeModal('activity')"
    >
        <div class="modal-body-row d-flex">
            <dropdown v-bind="{selectable,selected}" @selected="x => selected = x"></dropdown>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Date:</label>
                <input id="modal-activity-input" v-model="date" type="text" placeholder="YYYY-MM-DD" ></input>
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