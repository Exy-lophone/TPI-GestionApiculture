import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { asyncHandler, status, config, type ErrorStatus } from '../utils'
import { apiculteur } from '../database'
import { loginParser } from '../validation'

const wrongCredErr: ErrorStatus = {
    status: status.UNAUTHORIZED,
    message: 'Wrong credentials',
}

const register = asyncHandler(async (req, res) => {
    const { username, password } = loginParser.parse(req.body)
    const hashedPswd = await bcrypt.hash(password,10)
    const user = await apiculteur.create(username, hashedPswd)
    const token = jwt.sign({userId: user.idApiculteur }, config.SECRET_KEY, {expiresIn: '1h'})
    res.status(status.OK_CREATED).json({token})
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = loginParser.parse(req.body)
    const user = await apiculteur.getByUsername(username)
    if(!user) throw wrongCredErr
    const match = await bcrypt.compare(password,user.apiMotDePasse);
    if(!match) throw wrongCredErr
    const token = jwt.sign({userId: user.idApiculteur},config.SECRET_KEY,{expiresIn: '1h'})
    res.status(status.OK).json({token})
})

export const authController = {
    register,
    login,
}