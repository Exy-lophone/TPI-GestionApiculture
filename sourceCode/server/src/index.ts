import { config } from './utils/index'
import express from 'express'
import cors from 'cors'
import { authRouter, rucherRouter, categorieRouter } from './routes'

//init
const app = express()

//Set up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/rucher', rucherRouter)
app.use('/categorie', categorieRouter)

//Start listening
app.listen(process.env.PORT, () => console.log(`Server started at: http://localhost:${config.PORT}`))
app.get('/', (req, res) => res.status(200).json({message:"Server is running !"}))