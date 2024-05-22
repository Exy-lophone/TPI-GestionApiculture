<script setup lang="ts">
export type ModalProps = {
    title: string
}

export type ModalEmits = {
    (e: 'canceled'): void,
    (e: 'validated'): void,
    (e: 'background-clicked'): void
}

const props = defineProps<ModalProps>()
const emit = defineEmits<ModalEmits>()
</script>

<template>
    <div class="modal-background d-flex" @click.self="emit('background-clicked')">
        <div class="modal">
            <div class="modal-header font-bold">{{ props.title }}</div>
            <slot></slot>
            <div class="modal-footer d-flex">
                <button class="btn-red" @click="emit('canceled')">Annuler</button>
                <button class="btn-green" @click="emit('validated')">Valider</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-background {
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 3;
        backdrop-filter: blur(2px);
    }
    .modal {
        background-color: var(--neutral-0);
        border-radius: 1rem;
    }
    .modal-header {
        background-color: var(--primary-300);
        padding: 1rem 0;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        text-align: center;
    }
    .modal-footer {
        border-top: 1px var(--neutral-900) solid;
        padding: 1rem 0;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        gap: 2rem;
    }
</style>