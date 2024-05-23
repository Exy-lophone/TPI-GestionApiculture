import { ref, type Ref } from 'vue'
import { z } from 'zod'

export type FetchRequest<T> = {
    url: string,
    req: RequestInit,
    parser: z.ZodType<T>
}

export type FetchResult<T> = {
    data: Ref<T> | Ref<null>,
    loading: Ref<Boolean>,
    error: Ref<unknown>,
    load: (fetchRequest: FetchRequest<T>, callback?: (data: T) => void) => Promise<void>
}

export const createFetchResult = <T>(): FetchResult<T> => {
    return {
        data: ref(null),
        loading: ref(true),
        error: ref(null),
        load: async function (fetchRequest: FetchRequest<T>, callback?: (data: T) => void) {
            this.data.value = null
            this.loading.value = true
            this.error.value = null
            try {
                const response = await fetch(fetchRequest.url, fetchRequest.req)
                const json = await response.json()
                if(!(response.status >= 200 && response.status < 300)) {
                    throw Error (json.error)
                }
                this.data.value = fetchRequest.parser.parse(json)
                if(callback) {
                    callback(this.data.value);
                }
            } catch (err) {
                this.error.value = err
                console.log(err)
            } finally {
                this.loading.value = false
            }
        }
    }
}

export const useFetch = async (url: string, req: RequestInit) => {
    try {
        const response = await fetch(url,req)
        const json = await response.json()
        if(!(response.status >= 200 && response.status < 300)) {
            throw Error (json.error)
        }
    } catch (err) {
        console.log(err)
    }
} 

