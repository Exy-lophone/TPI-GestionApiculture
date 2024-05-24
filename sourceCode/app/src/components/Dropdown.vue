<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { deepCopy } from '@/utils/deepCopy'
import ArrowIcon from './ArrowIcon.vue'

export type DropDownItem = {
    display: string,
    value: string
}

export type DropdownProps = {
    selected: DropDownItem,
    selectable: DropDownItem[],
}

export type DropdownEmits = {
    (e: 'selected', value: DropDownItem): void
}

const props = defineProps<DropdownProps>()

const emit = defineEmits<DropdownEmits>()
const selectable: Ref<DropDownItem[]> = ref(deepCopy(props.selectable))
const selected: Ref<DropDownItem> = ref(deepCopy(props.selected))

const show = ref(false)

function itemSelected(item: DropDownItem, index: number) {
    selectable.value[index] = selected.value
    selected.value = item
    show.value = false
    emit('selected', selected.value)
}

onMounted(() => {
    emit('selected', selected.value)
})
</script>

<template>
    <div class="drop-position" @mouseleave="show = false">
        <div class="dropdown-display">
            <input type="text" :value="selected.display"></input>
            <arrow-icon direction="down" stroke="white" @click="show = true"></arrow-icon>
        </div>
        <div v-if="show" class="dropdown outline-shadow d-flex">
            <p 
                v-for="(item, index) in selectable" 
                :key="item.value" @click="itemSelected(item, index)"
            >{{ item.display }}</p>
        </div>
    </div>
</template>

<style scoped>
.drop-position {
    position: relative;
}
.dropdown {
    position: absolute;
    top: 100%;
    z-index: 2;
    background-color: var(--neutral-900);
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
    align-items: start;
    border-radius: 0.5rem;
}
.dropdown p {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem 1rem;
    color: var(--primary-300);
}
.dropdown p:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.dropdown p:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
.dropdown p:hover {
    color: var(--neutral-900);
    background-color: var(--primary-300);
}
.dropdown-display {
    background-color: var(--neutral-900);
    border-radius: 0.5rem;
    padding-right: 1rem;
}
</style>