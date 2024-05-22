<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createFetchResult } from '@/composables/useFetch';
import { z } from 'zod';
import { BASE_URL, activityParser, getToken } from '@/utils';
import ActivityItem from '@/components/ActivityItem.vue';

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
const getURL = () => {
    switch (props.from) {
        case 'all': return BASE_URL+`/activite/year/${props.year}`;
        case 'ruche': return BASE_URL+`/ruche/${route.params.id}/activites`;
        case 'rucher': return BASE_URL+`/rucher/${route.params.id}/activites`;
    }
}
const filterRuche = (id: number) => {
    if(props.from !== 'ruche') return true
    return id === z.coerce.number().parse(route.params.id)
}

const parser = z.array(activityParser)
type Activities = z.infer<typeof parser>

const unwrapActivities = (activities: Activities | null) => {
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
const activities = createFetchResult<Activities>()
activities.load({
    url: getURL(),
    req: {
        headers: {
            'Authorization': `bearer ${getToken()}` 
        }
    },
    parser
})
</script>

<template>
    <div v-if="props.from !== 'all'" class="activity-list-title d-flex">
        <h3 class="font-size-h3 font-bold">Activité(s)</h3>
        <button class="btn-white outline-shadow">Ajouter +</button>
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