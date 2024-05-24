import { createFetchResult } from './useFetch'
import { colorParser, type Color } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'

export const colorFetch = createFetchResult<Color[]>()

export const loadAllColor = () => {
    colorFetch.load({
        url: BASE_URL+`/couleur`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: z.array(colorParser)
    })
}