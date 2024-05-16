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
    load: (fetchRequest: FetchRequest<T>) => Promise<void>
}

export const createFetchObj = <T>(): FetchResult<T> => {
    return {
        data: ref(null),
        loading: ref(true),
        error: ref(null),
        load: async function (fetchRequest: FetchRequest<T>) {
            this.loading.value = true
            try {
                console.table(fetchRequest.req)
                const response = await fetch(fetchRequest.url, fetchRequest.req)
                const json = await response.json()
                this.data.value = fetchRequest.parser.parse(json)
            } catch (err) {
                this.error.value = err
                console.log(err)
            } finally {
                this.loading.value = false
            }
        }
    }
}