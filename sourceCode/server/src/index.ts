import { config } from './utils/index'
import express from 'express'
import cors from 'cors'
import { authRouter, rucherRouter, categorieRouter, activiteRouter, couleurRouter, reineRouter, rucheRouter } from './routes'
import { verifyToken } from './middlewares'

//init
const app = express()

//Set up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/ruche', verifyToken, rucheRouter)
app.use('/rucher', verifyToken, rucherRouter)
app.use('/categorie', verifyToken, categorieRouter)
app.use('/activite', verifyToken, activiteRouter)
app.use('/couleur', verifyToken, couleurRouter)
app.use('/reine', verifyToken, reineRouter)

//Start listening
app.listen(process.env.PORT, () => console.log(`Server started at: http://localhost:${config.PORT}`))
app.get('/', (req, res) => res.status(200).json({message:"Server is running !"}))