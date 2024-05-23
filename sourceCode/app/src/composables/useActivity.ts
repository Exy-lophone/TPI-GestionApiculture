import { createFetchResult, useFetch } from './useFetch'
import { activityParser, type Activity } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'
import { useRoute } from 'vue-router'

export const activitiesFetch = createFetchResult<Activity[]>()

export const activitiesByRucheFetch = createFetchResult<Activity[]>()

export const activitiesByRucherFetch = createFetchResult<Activity[]>()

export const loadAllActivities = (year: number) => {
    activitiesFetch.load({
        url: BASE_URL+`/activite/year/${year}`,
        req: {
          headers: {
            'Authorization': `bearer ${getToken()}`
          }
        },
        parser: z.array(activityParser)
    })
}

export const loadAllActivitiesByRucherId = (id: number) => {
    activitiesByRucherFetch.load({
        url: BASE_URL+`/rucher/${id}/activites`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: z.array(activityParser)
    })
}

export const loadAllActivitiesByRucheId = (id: number) => {
    activitiesByRucheFetch.load({
        url: BASE_URL+`/ruche/${id}/activites`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: z.array(activityParser)
    })
}

export const deleteActivityById = async (id: number) => {
    await useFetch(BASE_URL+`/activite/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    })

    updatePage()
    loadAllActivities(2024)
}

const updatePage = () => {
    const route = useRoute()

    if(route.params.id) {
        loadAllActivitiesByRucheId(z.coerce.number().parse(route.params.id))
        loadAllActivitiesByRucherId(z.coerce.number().parse(route.params.id))
    }
}