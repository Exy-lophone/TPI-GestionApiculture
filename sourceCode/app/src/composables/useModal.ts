import type { Activity, Ruche, Rucher } from "@/utils";
import { reactive } from "vue";

export type ModalMode = {
    show: boolean,
    mode: 'modify' | 'add',
}


export type Modal = {
    rucher: ModalMode,
    ruche: ModalMode,
    activity: ModalMode
}

export const modals = reactive<Modal>({
    rucher: {
        show: false,
        mode: 'add'
    },
    ruche: {
        show: false,
        mode: 'add'
    },
    activity: {
        show: false,
        mode: 'add'
    }
})

export let currentRucher: Rucher
export let currentRuche: Ruche
export let currentActivity: Activity


export const showModal = (name: keyof Modal, mode: ModalMode['mode']) => {
    modals[name].mode = mode
    modals[name].show = true
}

export const closeModal = (name: keyof Modal) => {
    modals[name].show = false
}