import { resWithErr } from './errorUtils'
import type { RequestHandler, Request, Response } from 'express'

export function asyncHandler(reqhndlr: RequestHandler): RequestHandler {
    return async function (req, res, next) {
        try {
            await reqhndlr(req, res, next)
        } catch (err) {
            resWithErr(err,res)
        }
    }
}