import { createFetchResult, useFetch } from './useFetch'
import { categoryParser, type Category } from '../utils'
import { BASE_URL, getToken } from '../utils'
import { z } from 'zod'

export const categoriesFetch = createFetchResult<Category[]>()

export const loadAllCategories = () => {
    categoriesFetch.load({
        url: BASE_URL+`/categorie`,
        req: {
            headers: {
                'Authorization': `bearer ${getToken()}`
            }
        },
        parser: z.array(categoryParser)
    })
}