import type { Response } from 'express'
import type { HttpStatusCode } from './httpStatusCode'

export type ErrorStatus = {
    status: HttpStatusCode
    message: string
}

export type predicate<T> = (x: T) => boolean

export function throwErrStatus(message: string, status: HttpStatusCode) {
    const err: ErrorStatus = {
        message: message,
        status
    }

    throw err
}

export function throwWhen<T> (value: T, status: HttpStatusCode, msg: string, condition: predicate<T>) {
    if(!condition(value)) return
    throwErrStatus(msg,status)
}

export function resWithErr(err: unknown, res: Response) {
    if(!err || typeof err !== "object") {
        console.log('[resWithErr] not a valid error') 
        return
    }
    if(err instanceof Error) {
        console.error(err.message)
        res.status(500).json({error:err.message})
        return;
    }
    const errStatus = (err as ErrorStatus)
    if(!errStatus) return
    console.error(errStatus.message)
    res.status(errStatus.status).json({error:errStatus.message})
}