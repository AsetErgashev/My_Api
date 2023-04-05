import express from 'express'
import { authLogin, authRegister, authUsers } from './auth.controller.js'
import { authSecury } from '../middleware/auth.middleware.js'
import { check } from 'express-validator'

const router = express.Router()

router.route('/register').post(
    [
        check('email','Email can not be empty').notEmpty(),
        check('password','Password must be min-4 and max-12').isLength({min:4, max:12})
    ],
    authRegister
)

router.route('/login').post(authLogin)
router.route('/users').get(authUsers)

export default router