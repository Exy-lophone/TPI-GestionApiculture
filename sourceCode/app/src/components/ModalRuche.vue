<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { modals, closeModal, currentRuche } from '@/composables/useModal';
import { colorFetch } from '@/composables/useColor';
import { queenFetch } from '@/composables/useQueen';
import { ref } from 'vue';
import { z } from 'zod';
import Dropdown from './Dropdown.vue';
import { type DropDownItem } from './Dropdown.vue';
import { createRuche, updateRuche  } from '@/composables/useRuche';

const nbr = ref('')
const description = ref('')

type DropdownItems = {
    [key: string]: {
        selected: DropDownItem,
        selectable: DropDownItem[]
    }
}

const dropdownItems: DropdownItems = {
    queen: {
        selected: { display: 'Année', value: '' },
        selectable: []
    },
    color: {
        selected: { display: 'Couleur', value: '' },
        selectable: []
    }
}

if(colorFetch.data.value) {
    dropdownItems.color.selectable = colorFetch.data.value.map(x => ({display: x.couNom, value: `${x.idCouleur}`}))
}
if(queenFetch.data.value) {
    dropdownItems.queen.selectable = queenFetch.data.value.map(x => ({display: `${x.reiAnneNaissance}`, value: `${x.idReine}`}))
}

const getTitle = () => {
    switch (modals.ruche.mode) {
        case 'add': return 'Ajouter'
        case 'modify': return 'Modifier'
    }
}

const create = () => {
    if(!currentRuche.value) {
        console.error('[ModalRuche] currentRuche is null !')
        return
    }
    const rucherId = currentRuche.value.fkRucher
    createRuche({
        nbr: z.coerce.number().parse(nbr.value),
        description: description.value,
        fkCouleur: z.coerce.number().parse(dropdownItems.color.selected.value),
        fkReine: z.coerce.number().parse(dropdownItems.queen.selected.value),
        fkRucher: rucherId
    })
    closeModal('ruche')
}

const update = () => {
    if(!currentRuche.value) {
        console.error('[ModalRuche] currentRuche.value is null !')
        return
    }
    if(!currentRuche.value.id) {
        console.error('[ModalRuche] currentRuche.value.id is null !')
        return
    }
    updateRuche({
        id: currentRuche.value.id,
        nbr: z.coerce.number().parse(nbr.value),
        description: description.value,
        fkCouleur: z.coerce.number().parse(dropdownItems.color.selected.value),
        fkReine: z.coerce.number().parse(dropdownItems.queen.selected.value),
        fkRucher: currentRuche.value.fkRucher
    }, )
    closeModal('ruche')
}

const validate = () => {
    switch (modals.ruche.mode) {
        case 'add': create(); break
        case 'modify': update(); break
    }
}

if (modals.ruche.mode === 'modify' && currentRuche.value) {
    console.log('hello')
    const ruche = currentRuche.value
    nbr.value = `${ruche.nbr}`
    description.value = ruche.description
}

</script>

<template>
    <modal 
        :title="getTitle()" 
        @validated="validate()" 
        @canceled="closeModal('ruche')" 
        @background-clicked="closeModal('ruche')"
    >
        <div class="modal-body-row d-flex">
            <div class="modal-label-input d-flex">
                <label class="font-bold">Numéro:</label>
                <input id="modal-activity-input" v-model="nbr" type="text" placeholder="Numéro" ></input>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Couleur:</label>
                <dropdown 
                    v-bind="{ 
                        selectable: dropdownItems.color.selectable,
                        selected: dropdownItems.color.selected
                    }" 
                    @selected="x => dropdownItems.color.selected = x"
                ></dropdown>
            </div>
            <div class="modal-label-input d-flex">
                <label class="font-bold">Reine:</label>
                <dropdown 
                    v-bind="{ 
                        selectable: dropdownItems.queen.selectable,
                        selected: dropdownItems.queen.selected
                    }" 
                    @selected="x => dropdownItems.queen.selected = x"
                ></dropdown>
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