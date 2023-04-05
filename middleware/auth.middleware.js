import jwt from 'jsonwebtoken'

export const authSecury = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]
    const secret = process.env.JWT_SECRET

    if(!token){
        return res.status(404).json({message: 'Please give token'})
    }

    const decoded = jwt.verify(token, secret)
    
    req.user = decoded
    next()
}