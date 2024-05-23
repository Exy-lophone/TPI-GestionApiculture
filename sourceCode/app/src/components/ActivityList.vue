<script setup lang="ts">
import { useRoute } from 'vue-router';
import { type FetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { type Activity } from '@/utils';
import ActivityItem from '@/components/ActivityItem.vue';
import { activitiesByRucheFetch, activitiesByRucherFetch, activitiesFetch, loadAllActivities, loadAllActivitiesByRucheId, loadAllActivitiesByRucherId } from '@/composables/useActivity';
import { showModal } from '@/composables/useModal';

export type ActivityListProps = {
    from: 'rucher' | 'ruche' | 'all'
    year?: number
}

const props = withDefaults(defineProps<ActivityListProps>(), {
    year: 2024
})

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

const unwrapActivities = (activities: Activity[] | null) => {
    if(!activities) return []
    return activities.flatMap(x => {
        return x.ruches.map(y => ({
            idActivite: x.idActivite,
            actDate: x.actDate,
            actDuree: x.actDuree,
            actDescription: x.actDescription,
            categorie: x.categorie,
            ruche: y
        }))
    })
}

const route = useRoute()

let activities: FetchResult<Activity[]>;
switch (props.from) {
    case 'all': 
        activities = activitiesFetch;
        loadAllActivities(props.year);
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
        <template v-for="activity in unwrapActivities(activities.data.value)" :key="activity.idActivite">          
            <activity-item
                v-if="filterRuche(activity.ruche.idRuche)"
                :key="activity.idActivite"
                v-bind="{
                    id: activity.ruche.idRuche,
                    category: activity.categorie.catNom,
                    date: getDateFromIsoDate(activity.actDate),
                    time: getTimeFromIsoDate(activity.actDuree),
                    nbRuche: activity.ruche.rucNumero,
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