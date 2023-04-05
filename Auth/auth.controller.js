import bcrypt from 'bcrypt'
import User from "../model/User.js"
import asyncHandler from 'express-async-handler'
import { generateToken } from './generate-token.js'
import { validationResult } from 'express-validator'

export const authRegister = asyncHandler(async(req,res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
    return res.status(400).json({message: "Error in register", errors})
    }

    const {email, password} = req.body
    const isHave = await User.findOne({email})
    if (isHave) {
        return res.status(400).json({message: "User already exist Sorry!"})
    }
    const hash = bcrypt.hashSync(password, 7)
    const user = new User({email, password: hash})

    await user.save()
    return res.json({message: "User cerated Succesfully"})
})

export const authLogin = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({message: `User with ${email} connot`})
    }
    const isPass = bcrypt.compareSync(password, user.password)
    if (!isPass) {
        res.status(400).json({message: `Password is wrong`})
    }
    const token = generateToken(user._id)
    return res.json({token})
})

export const authUsers = asyncHandler(async(req,res) => {
    const users = await User.find()
    
    res.json({users})
})