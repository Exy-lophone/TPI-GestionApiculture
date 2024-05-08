import dotenv from 'dotenv'
import { generateSecretKey } from '../utils/generateSecretKey'
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
let SECRET_KEY = process.env.SECRET_KEY

if(!DATABASE_URL) throw new Error('[.env] DATABASE_URL is not defined')
if(!PORT) throw new Error('[.env] PORT is not defined')
if(!SECRET_KEY) {
    SECRET_KEY = generateSecretKey(255)
    console.log("[.env] SECRET_KEY is not defined")
    console.log("[.env] SECRET_KEY has been generated")
    console.log(SECRET_KEY)
}

export const config = {
    DATABASE_URL,
    PORT,
    SECRET_KEY
}