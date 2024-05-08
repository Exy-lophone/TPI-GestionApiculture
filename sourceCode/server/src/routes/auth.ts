import express from "express"

export const authRouter = express.Router()

authRouter
    .post('/register', async (req,res) => {res.status(200).json({msg:'register route'})})
    .post('/login', async (req,res) => {res.status(200).json({msg:'login route'})})

// router.get('/verify',verifyToken,(req,res,next) => res.status(status.OK).json({authentication: true}))