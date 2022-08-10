import  * as jwt from 'jsonwebtoken'


export const generarToken = (user)=> {
   return jwt.sign({ user }, 'secretkey', { expiresIn:'1h' })
}


export const verifyToken = (token)=> {
   return jwt.verify(token, 'secretkey')
}