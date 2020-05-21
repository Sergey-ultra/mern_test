const jwt = require('jsonwebtoken')
const config = require('config')

module.exports= (req,res,next) => {
    if (req.method ==='OPTIONS'){
        return next()
    }
    try {

        const token = req.headers.authorization.split(' ')[1] //"Bearer Token"


        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }

        const decoded = jwt.verify(token,config.get('jwtSecret'))
        console.log(decoded)
        req.user = decoded
        next()
    } catch (e){
        return res.status(401).json({message: 'Нет авторизации, что-то пошло не так'})
    }
}