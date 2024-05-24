import type { Activity, Ruche, Rucher } from "@/utils";
import { reactive, ref, type Ref } from "vue";

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

export type RucheCreate = {
    id?: number,
    nbr: number,
    description: string,
    fkReine: number,
    fkRucher: number,
    fkCouleur: number
}

export const currentRucher: Ref<Rucher | null> = ref(null)
export const currentRuche: Ref<RucheCreate | null> = ref(null)
export const currentActivity: Ref<Omit<Activity, "ruches"> | null> = ref(null)


export const showModal = (name: keyof Modal, mode: ModalMode['mode']) => {
    modals[name].mode = mode
    modals[name].show = true
}

export const closeModal = (name: keyof Modal) => {
    modals[name].show = false
}