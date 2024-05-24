import { createFetchResult } from './useFetch'
import { queenParser, type Queen } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'

export const queenFetch = createFetchResult<Queen[]>()

export const loadAllQueen = () => {
    queenFetch.load({
        url: BASE_URL+`/reine`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: z.array(queenParser)
    })
}