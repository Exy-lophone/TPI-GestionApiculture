<script setup lang="ts">
import { useRoute } from 'vue-router';
import { type FetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { type Activity } from '@/utils';
import ActivityItem from '@/components/ActivityItem.vue';
import { year, activitiesByRucheFetch, activitiesByRucherFetch, activitiesFetch, loadAllActivities, loadAllActivitiesByRucheId, loadAllActivitiesByRucherId } from '@/composables/useActivity';
import { showModal } from '@/composables/useModal';

export type ActivityListProps = {
    from: 'rucher' | 'ruche' | 'all'
}

const props = defineProps<ActivityListProps>()

const getDateFromIsoDate = (isoDate: string) => {
    return isoDate.split('T')[0]
}

const getTimeFromIsoDate = (isoDate: string) => {
    const time = isoDate.split('T')[1].split(':')
    return time[0] + ':' + time[1]
}

const filterRuche = (id: number) => {
    if(props.from !== 'ruche') return true
    return id === z.coerce.number().parse(route.params.id)
}

const route = useRoute()

let activities: FetchResult<Activity[]>;
switch (props.from) {
    case 'all': 
        activities = activitiesFetch;
        loadAllActivities(year.value);
        break;
    case 'ruche': 
        activities = activitiesByRucheFetch;
        loadAllActivitiesByRucheId(z.coerce.number().parse(route.params.id));
        break;
    case 'rucher': activities = activitiesByRucherFetch;
        loadAllActivitiesByRucherId(z.coerce.number().parse(route.params.id));
        break;
}

</script>

<template>
    <div v-if="props.from !== 'all'" class="activity-list-title d-flex">
        <h3 class="font-size-h3 font-bold">Activité(s)</h3>
        <button class="btn-white outline-shadow" @click="showModal('activity', 'add')">Ajouter +</button>
    </div>
    <div class="activity-list d-flex">
        <template v-for="activity in activities.data.value" :key="activity.idActivite">          
            <activity-item
                v-if="filterRuche(activity.ruches.idRuche)"
                :key="activity.idActivite"
                v-bind="{
                    id: activity.idActivite,
                    category: activity.categorie.catNom,
                    date: getDateFromIsoDate(activity.actDate),
                    time: getTimeFromIsoDate(activity.actDuree),
                    nbRuche: activity.ruches.rucNumero,
                    description: activity.actDescription
                }"
            ></activity-item>
        </template>
    </div>
</template>

<style>
.activity-list-title {
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0;
}
.activity-list {
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 0;
    align-items: stretch;
    max-width: 70rem;
    margin: auto;
}
</style>