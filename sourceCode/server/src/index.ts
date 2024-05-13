import { config } from './utils/index'
import express from 'express'
import cors from 'cors'
import { authRouter, rucherRouter, categorieRouter, activiteRouter, couleurRouter, reineRouter, rucheRouter } from './routes'

//init
const app = express()

//Set up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/ruche', rucheRouter)
app.use('/rucher', rucherRouter)
app.use('/categorie', categorieRouter)
app.use('/activite', activiteRouter)
app.use('/couleur', couleurRouter)
app.use('/reine', reineRouter)

//Start listening
app.listen(process.env.PORT, () => console.log(`Server started at: http://localhost:${config.PORT}`))
app.get('/', (req, res) => res.status(200).json({message:"Server is running !"}))