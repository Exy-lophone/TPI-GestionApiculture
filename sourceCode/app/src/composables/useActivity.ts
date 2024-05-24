import { createFetchResult, useFetch } from './useFetch'
import { activityParser, type Activity } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'
import { ref } from 'vue'

export const activitiesFetch = createFetchResult<Activity[]>()

export const activitiesByRucheFetch = createFetchResult<Activity[]>()

export const activitiesByRucherFetch = createFetchResult<Activity[]>()

export const year = ref(2024)

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

export const createCategoryOnRuche = async (description: string, dateTime: string, fkCategorie: number, fkRucheOrRucher: number) => {
    await useFetch(BASE_URL+`/activite/onRuche`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description, 
            dateTime,
            fkCategorie, 
            fkRucheOrRucher
        })
    })    
}

export const createCategoryOnRucher = async (description: string, dateTime: string, fkCategorie: number, fkRucheOrRucher: number) => {
    await useFetch(BASE_URL+`/activite/onRucher`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description, 
            dateTime,
            fkCategorie, 
            fkRucheOrRucher
        })
    })     
}

export const deleteActivityById = async (id: number) => {
    await useFetch(BASE_URL+`/activite/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    })
    loadAllActivities(2024)
}