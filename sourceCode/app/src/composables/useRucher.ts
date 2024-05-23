import { createFetchResult, useFetch } from './useFetch'
import { rucherParser, type Rucher } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'

export const ruchersFetch = createFetchResult<Rucher[]>()

export const rucherDetailFetch = createFetchResult<Rucher>()

export const loadAllRucher = () => {
    ruchersFetch.load({
        url: BASE_URL+'/rucher',
        req: {
          headers: {
            'Authorization': `bearer ${getToken()}`
          }
        },
        parser: z.array(rucherParser)
    })
}

export const loadRucherDetailById = (id: number) => {
    rucherDetailFetch.load({
        url: BASE_URL+`/rucher/${id}`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: rucherParser
    })
}

export const deleteRucherById = async (id: number) => {
    await useFetch(BASE_URL+`/rucher/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${getToken()}`
        }
    })

    loadAllRucher()
}

export const createRucher = async (rucher: Rucher) => {
    await useFetch(BASE_URL+`/rucher`, {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nbr: rucher.rucNumero, 
            name: rucher.rucNom,
            localisation: rucher.rucLocalisation, 
            fkApiculteur: rucher.fkApiculteur
        })
    })

    loadAllRucher()
}

export const updateRucher = async (rucher: Partial<Rucher>) => {
    if(!rucher.idRucher) {
        console.error('[useRucher] idRucher is undefined !')
        return
    }
    
    await useFetch(BASE_URL+`/rucher/${rucher.idRucher}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nbr: rucher.rucNumero, 
            name: rucher.rucNom,
            localisation: rucher.rucLocalisation, 
            fkApiculteur: rucher.fkApiculteur
        })
    })

    loadAllRucher()
    loadRucherDetailById(rucher.idRucher)
}