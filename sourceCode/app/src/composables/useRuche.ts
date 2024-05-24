import { createFetchResult, useFetch } from './useFetch'
import { rucheParser, type Ruche } from '../utils'
import { type RucheCreate } from '../composables/useModal'
import { BASE_URL, getToken } from '../utils'
import { loadAllRucher } from './useRucher'
import { z } from 'zod'

export const rucheDetailFetch = createFetchResult<Ruche>()

export const loadRucheDetailById = (id: number) => {
    rucheDetailFetch.load({
        url: BASE_URL+`/ruche/${id}`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: rucheParser
    })
}

export const deleteRucheById = async (id: number) => {
    await useFetch(BASE_URL+`/ruche/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    })

    loadAllRucher()
}

export const createRuche = async (ruche: RucheCreate) => {
    await useFetch(BASE_URL+`/ruche`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruche)
    })
    loadAllRucher()
}

export const updateRuche = async (ruche: Partial<RucheCreate>) => {
    if(!ruche.id) {
        console.error('[useRuche] ruche.id is undefined !')
        return
    }

    await useFetch(BASE_URL+`/ruche/${ruche.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruche)
    })

    loadAllRucher()
    loadRucheDetailById(ruche.id)
}